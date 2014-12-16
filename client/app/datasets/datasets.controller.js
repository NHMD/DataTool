'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DatasetsCtrl', ['$scope', 'WorkbenchDataItem', 'WorkbenchTemplate', 'WorkbenchTemplateMappingItem', 'WorkbenchRow', 'Workbench',
		function($scope, WorkbenchDataItem, WorkbenchTemplate, WorkbenchTemplateMappingItem, WorkbenchRow, Workbench) {


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

						$scope.workbenchdataitems= WorkbenchDataItem.getFromWorkbench({"id": $scope.selectedWorkbench.WorkbenchID });
						
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
						$scope.workbenchtemplatemappingitems.$promise.then(function() {
							angular.forEach($scope.workbenchtemplatemappingitems, function(elm) {
								$scope.getters[elm.FieldName] = function(row) {
									return (row[elm.WorkbenchTemplateMappingItemID]) ? row[elm.WorkbenchTemplateMappingItemID].CellData : "";
								}
							});
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

				if (item.constructor.name === "Resource" && item.CellData !== "" && item.CellData !== undefined) {
					item.$update();
				} else if(item.constructor.name === "Resource" && item.CellData ===""){
					item.$delete();
				}
				else if(item.CellData !== ""){
					
					$scope.mappedRows[row.RowNumber][template.WorkbenchTemplateMappingItemID] = WorkbenchDataItem.save({
						"WorkbenchRowID": row.WorkbenchRowID,
						"RowNumber": row.RowNumber,
					    "CellData": item.CellData,
						"WorkbenchTemplateMappingItemID": template.WorkbenchTemplateMappingItemID,
						"ValidationStatus": 0
					});

				};


			};
						
			$scope.deleteRow = function(row, idx){
				
				WorkbenchRow.remove({id: row.WorkbenchRowID}).$promise.then(function(){
					 $scope.mappedRows.splice(idx, 1);
				});
					
				
			};
			
		    $scope.addRowToGrid = function() {
				WorkbenchRow.save({
										"WorkbenchID": $scope.selectedWorkbench.WorkbenchID
									}).
									$promise.then(function(workbenchrow){
										var row = {
											"WorkbenchRowID": workbenchrow.WorkbenchRowID,
											"RowNumber": workbenchrow.RowNumber
										};
										for (var i=0; i< $scope.workbenchtemplatemappingitems.length; i++) {
											
											
											row[$scope.workbenchtemplatemappingitems[i].WorkbenchTemplateMappingItemID] = new WorkbenchDataItem({
												"CellData" : "",
												"WorkbenchTemplateMappingID": $scope.workbenchtemplatemappingitems[i].WorkbenchTemplateMappingID,
												"ValidationStatus": 0,
												"WorkbenchRowID": workbenchrow.WorkbenchRowID,
												"RowNumber": workbenchrow.RowNumber
											});
											
										};
										$scope.mappedRows[workbenchrow.RowNumber]	= row;
										
									});
				
		      
		    };
			
			$scope.saveRow = function(data, WorkbenchRowID){
				
				console.log(WorkbenchRowID);
			};

		}

	]);
