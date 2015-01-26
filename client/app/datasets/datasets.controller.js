'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DatasetsCtrl', ['$rootScope', '$scope', '$modal', 'WorkbenchDataItem', 'WorkbenchTemplate', 'WorkbenchTemplateMappingItem', 'WorkbenchRow', 'Workbench', 'hotkeys', 'Icons', 'TaxonTreeDefItem', 'TaxonBrowserService','$timeout',
		function($rootScope, $scope, $modal, WorkbenchDataItem, WorkbenchTemplate, WorkbenchTemplateMappingItem, WorkbenchRow, Workbench, hotkeys, Icons, TaxonTreeDefItem, TaxonBrowserService, $timeout) {

			$scope.Icons = Icons;

			$scope.workbenches = Workbench.query();


			$scope.$watch('selectedWorkbench', function(newval, oldval) {
				if (newval && typeof newval === 'object' && newval !== oldval) {

					$scope.workbenchtemplatemappingitems = WorkbenchTemplateMappingItem.getFromWorkbenchTemplate({
						id: $scope.selectedWorkbench.WorkbenchTemplateID
					});


					$scope.workbenchtemplatemappingitems.$promise.then(function() {
						var WorkbenchTemplateMappingItemIDs = $scope.workbenchtemplatemappingitems.map(function(elm) {
							return elm.WorkbenchTemplateMappingItemID;
						});

						$scope.workbenchdataitems = WorkbenchDataItem.getFromWorkbench({
							"id": $scope.selectedWorkbench.WorkbenchID
						});


						$scope.workbenchdataitems.$promise.then($scope.mapRows);
						
						// getters are used for sorting
						$scope.getters = {};
						// this dataset's Workbenchtemplatemappings for taxonomy
						$scope.taxonMappings = {};
						
						// a small map to identyfy if we have 1, 2 or 3 determinations on this row
						TaxonBrowserService.determinations = [];

						angular.forEach($scope.workbenchtemplatemappingitems, function(elm) {

							var taxonname = elm.FieldName.toLowerCase().substring(0, elm.FieldName.length - 1)
							if (TaxonBrowserService.taxonRanks[taxonname]) {
								var determinationNumber = elm.FieldName.slice(-1);
								$scope.taxonMappings[elm.WorkbenchTemplateMappingItemID] = {
									determinationNumber: determinationNumber, // refers to appended number: species1, species2, species3 etc
									RankID: TaxonBrowserService.taxonRanks[taxonname]
								};
								TaxonBrowserService.determinations[parseInt(determinationNumber-1)] = determinationNumber;
							};

							$scope.getters[elm.FieldName] = function(row) {
								return (row[elm.WorkbenchTemplateMappingItemID]) ? row[elm.WorkbenchTemplateMappingItemID].CellData : "";
							}
						});
						
						TaxonBrowserService.selectedDetermination = (TaxonBrowserService.determinations.length) ? TaxonBrowserService.determinations[0]: undefined;
					});


				}
			});

			$scope.mapRows = function() {
				var mappedRows = [];
				for (var i = 0; i < $scope.workbenchdataitems.length; i++) {

					if (mappedRows[$scope.workbenchdataitems[i].RowNumber] === undefined) {
						mappedRows[$scope.workbenchdataitems[i].RowNumber] = {
							WorkbenchRowID: $scope.workbenchdataitems[i].WorkbenchRowID,
							RowNumber: $scope.workbenchdataitems[i].RowNumber
						};
					};

					mappedRows[$scope.workbenchdataitems[i].RowNumber][$scope.workbenchdataitems[i].WorkbenchTemplateMappingItemID] = $scope.workbenchdataitems[i];
				};

				$scope.mappedRows = mappedRows;

			};

			$scope.createOrUpdateWorkBenchDataItem = function(row, item, template) {

				if (item.constructor.name === "Resource") {

					if (item.WorkbenchDataItemID === undefined) {
						item.$save();
					} else if (item.CellData !== "" && item.CellData !== undefined) {
						item.$update();
					} else if (item.CellData === "" || item.CellData === undefined) {
						item.$delete();
					};

				} else if (item.CellData !== "") {

					$scope.mappedRows[row.RowNumber][template.WorkbenchTemplateMappingItemID] = WorkbenchDataItem.save({
						"WorkbenchRowID": row.WorkbenchRowID,
						"RowNumber": row.RowNumber,
						"CellData": item.CellData,
						"WorkbenchTemplateMappingItemID": template.WorkbenchTemplateMappingItemID,
						"ValidationStatus": 0
					});

				};


			};

			$scope.deleteRow = function(row, idx) {

				WorkbenchRow.remove({
					id: row.WorkbenchRowID
				}).$promise.then(function() {
					$scope.mappedRows.splice($scope.mappedRows.indexOf(row), 1);
				});


			};

			$scope.carryForward = function(rowNumber, workbenchTemplateMappingItem) {

				if (!workbenchTemplateMappingItem.CarryForward) {
					return "";
				} else if (workbenchTemplateMappingItem.CarryForward) {
					var forwardValue = $scope.mappedRows[$scope.mappedRows.length - 1][workbenchTemplateMappingItem.WorkbenchTemplateMappingItemID].CellData;
					return forwardValue;
				};


			};

			$scope.addRowToGrid = function() {
				WorkbenchRow.save({
					"WorkbenchID": $scope.selectedWorkbench.WorkbenchID
				}).
				$promise.then(function(workbenchrow) {
					var row = {
						"WorkbenchRowID": workbenchrow.WorkbenchRowID,
						"RowNumber": workbenchrow.RowNumber,
						"inserted": true
					};
					for (var i = 0; i < $scope.workbenchtemplatemappingitems.length; i++) {


						row[$scope.workbenchtemplatemappingitems[i].WorkbenchTemplateMappingItemID] = new WorkbenchDataItem({
							"CellData": $scope.carryForward(workbenchrow.RowNumber, $scope.workbenchtemplatemappingitems[i]),
							"WorkbenchTemplateMappingItemID": $scope.workbenchtemplatemappingitems[i].WorkbenchTemplateMappingItemID,
							"ValidationStatus": 0,
							"WorkbenchRowID": workbenchrow.WorkbenchRowID,
							"RowNumber": workbenchrow.RowNumber
						});

					};
					$scope.mappedRows[workbenchrow.RowNumber] = row;
					
					
					// timout is needed to move the click trigger outside the current digest cycle
					$timeout(function(){
			
						// had to use JQuery for these ones....
						$("ul.pagination li:last a").trigger('click');
						$("tbody").animate({
							scrollTop: $("tbody tr:last").offset().top
						}, "slow");
					});
					
					
					

				});


			};

			$scope.saveRow = function(row) {
				// remove the mark that this row is "dirty"
				delete row.inserted;
			};
			$scope.addTaxonToSelectedRows = function() {
				for (var i = 0; i < $scope.rowCollection.length; i++) {

					if ($scope.rowCollection[i] !== undefined && $scope.rowCollection[i].isSelected) {
						$scope.addTaxonToRow($scope.rowCollection[i]);
					}
				}
			};
			// tell the TaxonBrowserService to add selected taxon to the selected rows when selection is done
			TaxonBrowserService.selectCallbacks.push($scope.addTaxonToSelectedRows);
			
			$scope.addTaxonToRow = function(row) {

				if (TaxonBrowserService.selectedTaxon === undefined || TaxonBrowserService.selectedTaxon.constructor.name !== 'Resource') return;
				for (var key in $scope.taxonMappings) {
					if($scope.taxonMappings[key].determinationNumber === TaxonBrowserService.selectedDetermination){
						
						if (TaxonBrowserService.selectedTaxon.RankID === $scope.taxonMappings[key].RankID){
							
							var item = (row[key] !== undefined) ? row[key] : {};
							
							item.CellData = TaxonBrowserService.selectedTaxon.Name;
							
							$scope.createOrUpdateWorkBenchDataItem(row, item, {
								WorkbenchTemplateMappingItemID: key
							});
							
						} else {
							var p = TaxonBrowserService.taxonParent;
							while (p !== null) {
								if (p.RankID === $scope.taxonMappings[key].RankID && $scope.taxonMappings[key].determinationNumber === TaxonBrowserService.selectedDetermination) {
									
									var item = (row[key] !== undefined) ? row[key] : {};
									item.CellData = p.Name;
									$scope.createOrUpdateWorkBenchDataItem(row, item, {
										WorkbenchTemplateMappingItemID: key
									});
									break;

								};
								p = p.Parent;
							}
						}
					}
					
				}

			};


			hotkeys.bindTo($scope)
				.add({
					combo: 'ctrl+n',
					description: 'Add row to dataset',
					callback: $scope.addRowToGrid
				})
				.add({
					combo: 'ctrl+f',
					description: 'Open /close carry forward window',
					allowIn: ['INPUT'],
					callback: function() {
						if (!$scope.carryForwardModal.$isShown) {
							$scope.carryForwardModal.$promise.then($scope.carryForwardModal.show);
						} else {
							$scope.updateWorkBenchtemplateMappingitems();
							$scope.carryForwardModal.hide();
						};

					}
				})
				.add({
					combo: 'ctrl+h',
					description: 'Open /close hide columns window',
					allowIn: ['INPUT'],
					callback: function() {
						if (!$scope.showcolumnsModal.$isShown) {
							$scope.showcolumnsModal.$promise.then($scope.showcolumnsModal.show);
						} else {
							
							$scope.showcolumnsModal.hide();
						};

					}
				})
				
				$scope.carryForwardModal = $modal({
					scope: $scope,
					template: '/app/datasets/carryforward.modal.tpl.html',
					show: false,
					prefixEvent: "carryforwardmodal"
				});
				
				$scope.showcolumnsModal = $modal({
					scope: $scope,
					template: '/app/datasets/showcolumns.modal.tpl.html',
					show: false,
					prefixEvent: "showcolumnsmodal"
				});
				
				// used for updating carry forward
				$scope.updateWorkBenchtemplateMappingitems = function(){			
					for(var i=0; i < $scope.workbenchtemplatemappingitems.length; i++){
						$scope.workbenchtemplatemappingitems[i].$update();
					}
				};
				
				

		}

	]);
