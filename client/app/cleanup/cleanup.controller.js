'use strict';

angular.module('specifyDataCleanerApp')
	.controller('CleanupCtrl', ['$scope', 'WorkbenchDataItemsFactory', 'WorkbenchTemplatesFactory', 'WorkbenchTemplateMappingItemsFactory',
		function($scope, WorkbenchDataItemsFactory, WorkbenchTemplatesFactory, WorkbenchTemplateMappingItemsFactory) {


			$scope.workbenchtemplates = WorkbenchTemplatesFactory.query();


			$scope.$watch('selectedWorkbench', function(newval, oldval) {
				if (newval && typeof newval === 'object' && newval !== oldval) {

					$scope.workbenchtemplatemappingitems = WorkbenchTemplateMappingItemsFactory.getFromWorkbenchTemplate({
						id: $scope.selectedWorkbench.WorkbenchTemplateID
					});


					$scope.workbenchtemplatemappingitems.$promise.then(function() {
						var WorkbenchTemplateMappingItemIDs = $scope.workbenchtemplatemappingitems.map(function(elm) {
							return elm.WorkbenchTemplateMappingItemID;
						});

						$scope.workbenchdataitems = WorkbenchDataItemsFactory.query({
							_query: {
								WorkbenchTemplateMappingItemID: { in : WorkbenchTemplateMappingItemIDs
								}
							}
						});
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

					if (mappedRows[$scope.workbenchdataitems[i].RowNumber] == undefined) {
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

				if (item.constructor.name === "Resource" && item.CellData !== "") {
					item.$update();
				} else if(item.constructor.name === "Resource" && item.CellData ===""){
					item.$delete();
				}
				else if(item.CellData !== ""){
					
					$scope.mappedRows[row.RowNumber][template.WorkbenchTemplateMappingItemID] = WorkbenchDataItemsFactory.save({
						"WorkbenchRowID": row.WorkbenchRowID,
						"RowNumber": row.RowNumber,
					    "CellData": item.CellData,
						"WorkbenchTemplateMappingItemID": template.WorkbenchTemplateMappingItemID,
						"ValidationStatus": 0
					});

				};


			};

		}

	]);
