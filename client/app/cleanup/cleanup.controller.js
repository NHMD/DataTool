'use strict';

angular.module('specifyDataCleanerApp')
	.controller('CleanupCtrl', ['$scope', '$http', 'WorkbenchDataItemsFactory', 'WorkbenchTemplatesFactory', 'WorkbenchTemplateMappingItemsFactory',
		function($scope, $http, WorkbenchDataItemsFactory, WorkbenchTemplatesFactory, WorkbenchTemplateMappingItemsFactory) {

			
			
			$scope.getFiltered = function(row){
				if(!$scope.searchText) return true;
					var found = false;
					angular.forEach(row, function(elm){
						if (elm.CellData && elm.CellData.indexOf($scope.searchText) > -1){
							found = true;
						}
					});
				    return found; 
				
			};
			
			$scope.workbenchtemplates = WorkbenchTemplatesFactory.query();
			
		
			$scope.$watch('selectedWorkbench', function(newval, oldval) {
				if (newval && typeof newval === 'object' && newval !== oldval) {
					
					$scope.workbenchtemplatemappingitems = WorkbenchTemplateMappingItemsFactory.getFromWorkbenchTemplate({ id: $scope.selectedWorkbench.WorkbenchTemplateID });
					
					
					$scope.workbenchtemplatemappingitems.$promise.then(function(){
					var WorkbenchTemplateMappingItemIDs = $scope.workbenchtemplatemappingitems.map(function(elm) {
						return elm.WorkbenchTemplateMappingItemID;
					});
					
					$scope.workbenchdataitems = WorkbenchDataItemsFactory.query({
								_query: {
									WorkbenchTemplateMappingItemID: { in : WorkbenchTemplateMappingItemIDs
									}
								}});
					$scope.workbenchdataitems.$promise.then($scope.mapRows);
				});
					

				}
			});
			
			$scope.mapRows = function(){
				var mappedRows = [];
				for (var i =0; i< $scope.workbenchdataitems.length; i++){
					
					if(mappedRows[$scope.workbenchdataitems[i].RowNumber] == undefined){
						mappedRows[$scope.workbenchdataitems[i].RowNumber] = {};
					};
					
					mappedRows[$scope.workbenchdataitems[i].RowNumber][$scope.workbenchdataitems[i].WorkbenchTemplateMappingItemID] = $scope.workbenchdataitems[i];
				};
				
				$scope.mappedRows = mappedRows;
				
			};

		}
	]);
