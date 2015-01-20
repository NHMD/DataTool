'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DatasetsCtrl', ['$rootScope', '$scope', 'WorkbenchDataItem', 'WorkbenchTemplate', 'WorkbenchTemplateMappingItem', 'WorkbenchRow', 'Workbench', 'hotkeys', 'Icons', 'Taxon', 'TaxonTreeDefItem','$modal',
		function($rootScope, $scope, WorkbenchDataItem, WorkbenchTemplate, WorkbenchTemplateMappingItem, WorkbenchRow, Workbench, hotkeys, Icons, Taxon, TaxonTreeDefItem, $modal) {

			$scope.Icons = Icons;

			$scope.workbenches = Workbench.query();


			$scope.getTaxon = function(viewValue) {
				if($rootScope.fields.selectedCollection === undefined) return "";
				var TaxonTreeDefID = $rootScope.fields.selectedCollection.discipline.TaxonTreeDefID;
				var value = (viewValue.constructor.name === 'Resource')? viewValue.Name : viewValue;
				
				var params = {
					where: {
						Name: {
							like: value + "%"
						},
						TaxonTreeDefID: {
							eq: TaxonTreeDefID
						}
					},
					limit: 30
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
			
			$scope.$watch('modal.selectedTaxon', function(newval, oldval) {
				console.log(newval);
				if(newval !== undefined && newval.constructor.name === "Resource"){
					$scope.taxonParent = Taxon.getParents({id:$scope.modal.selectedTaxon.TaxonID });
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
			$scope.addTaxonToSelectedRows = function(){
				for(var i=0; i< $scope.rowCollection.length; i++){
					
					if($scope.rowCollection[i].isSelected){
						$scope.addTaxonToRow($scope.rowCollection[i]); 
					}
				}
			};
			$scope.addTaxonToRow = function(row) {
				
				if($scope.modal.selectedTaxon === undefined || $scope.modal.selectedTaxon.constructor.name !== 'Resource' ) return;
				
				for (var key in row) {
				   if (row.hasOwnProperty(key) && $scope.taxonMappings[key] !== undefined ) {
					   if ($scope.modal.selectedTaxon.RankID === $scope.taxonMappings[key]){
					
							 row[key].CellData = $scope.modal.selectedTaxon.Name;
							 $scope.createOrUpdateWorkBenchDataItem(row, row[key], {WorkbenchTemplateMappingItemID: key});
   						
   					}
					else if($scope.taxonMappings[key] !== undefined){
						var p = $scope.taxonParent;
						while(p !== null){
	 					   if (p.RankID === $scope.taxonMappings[key]){
					
	 							 row[key].CellData = p.Name;
								  $scope.createOrUpdateWorkBenchDataItem(row, row[key], {WorkbenchTemplateMappingItemID: key});
								 break;
   						
	    					};
							p = p.Parent;
						}
					}
				   }
				}			
				
			};
			
			$scope.getTaxonRankNameFromRankID = function(rankId){
					
				for(var key in $scope.taxonRanks) { 
					if ($scope.taxonRanks[key] === rankId){
						return key;
					}
				};
				return "";
			};
			$scope.resetTaxon = function(){
				$scope.modal.selectedTaxon = undefined;
			};
			
			$scope.modal = {
			  selectedTaxon: $scope.selectedTaxon,
			  title: "Taxon browser",
			  content: "Hello Modal<br />This is a multiline message!",
				
			};
			
			
			hotkeys.bindTo($scope)
				.add({
					combo: 'ctrl+n',
					description: 'Add row',
					callback: $scope.addRowToGrid
				})

		}

	]);
