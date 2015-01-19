'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DatasetsCtrl', ['$rootScope', '$scope', 'WorkbenchDataItem', 'WorkbenchTemplate', 'WorkbenchTemplateMappingItem', 'WorkbenchRow', 'Workbench', 'hotkeys', 'Icons', 'Taxon', 'TaxonTreeDefItem',
		function($rootScope, $scope, WorkbenchDataItem, WorkbenchTemplate, WorkbenchTemplateMappingItem, WorkbenchRow, Workbench, hotkeys, Icons, Taxon, TaxonTreeDefItem) {

			$scope.Icons = Icons;

			$scope.workbenches = Workbench.query();


			$scope.getTaxon = function(viewValue) {
				var TaxonTreeDefID = ($rootScope.fields.selectedCollection !== undefined) ? $rootScope.fields.selectedCollection.discipline.TaxonTreeDefID : -1;
				var params = {
					_query: {
						Name: {
							like: viewValue + "%"
						},
						TaxonTreeDefID: {
							eq: TaxonTreeDefID
						}
					}
				};

				return Taxon.query(params).$promise;
					
			};

			$rootScope.$watch('fields.selectedCollection', function(newval, oldval) {
				if(newval !== undefined){
					$scope.taxonRanks = {};
					var taxontreedefitems = $rootScope.fields.selectedCollection.discipline.taxontreedef.taxontreedefitems;
					for (var i=0; i< taxontreedefitems.length; i++){
						$scope.taxonRanks[taxontreedefitems[i].Name.toLowerCase()] = taxontreedefitems[i].RankID;
					}
				}
			});
			
			$scope.$watch('selectedTaxon', function(newval, oldval) {
				if(newval !== undefined && newval.constructor.name === "Resource"){
					$scope.taxonParent = Taxon.getParents({id:$scope.selectedTaxon.TaxonID });
				}
				
				
			});
			
			
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

						/*
						$scope.workbenchdataitems = WorkbenchDataItem.query({
							_query: {
								WorkbenchTemplateMappingItemID: { in : WorkbenchTemplateMappingItemIDs
								}
							}
						});
						*/
						$scope.workbenchdataitems.$promise.then($scope.mapRows);

						$scope.getters = {};
						$scope.taxonMappings = {};

							angular.forEach($scope.workbenchtemplatemappingitems, function(elm) {
								
								var taxonname = elm.FieldName.toLowerCase().substring(0, elm.FieldName.length -1)
								if($scope.taxonRanks[taxonname]){
									$scope.taxonMappings[elm.WorkbenchTemplateMappingItemID] = $scope.taxonRanks[taxonname];
								};

								$scope.getters[elm.FieldName] = function(row) {
									return (row[elm.WorkbenchTemplateMappingItemID]) ? row[elm.WorkbenchTemplateMappingItemID].CellData : "";
								}
							});
				
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
					// had to use JQuery for this one....
					$("tbody").animate({
						scrollTop: $("tbody tr:last").offset().top
					}, "slow");

				});


			};

			$scope.saveRow = function(row) {
				// remove the mark that this row is "dirty"
				delete row.inserted;
			};

			$scope.addTaxonToRow = function(row) {
				
				if($scope.selectedTaxon === undefined || $scope.selectedTaxon.constructor.name !== 'Resource' ) return;
				
				for (var key in row) {
				   if (row.hasOwnProperty(key) && $scope.taxonMappings[key] !== undefined ) {
					   if ($scope.selectedTaxon.RankID === $scope.taxonMappings[key]){
					
							 row[key].CellData = $scope.selectedTaxon.Name;
   						
   					}
					else if($scope.taxonMappings[key] !== undefined){
						var p = $scope.taxonParent;
						while(p !== null){
	 					   if (p.RankID === $scope.taxonMappings[key]){
					
	 							 row[key].CellData = p.Name;
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
					description: 'Add row',
					callback: $scope.addRowToGrid
				})

		}

	]);
