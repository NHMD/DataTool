'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DataFormCtrl', ['$rootScope', '$scope', '$modal', 'Icons', 'hotkeys', '$filter',
		function($rootScope, $scope, $modal, Icons, hotkeys, $filter) {
			$scope.Icons = Icons;
			
			$scope.dataFormModal = $modal({
				scope: $scope,
				template: '/app/dataform/dataform.modal.tpl.html',
				show: false,
				prefixEvent: "dataformmodal"
			});
			$scope.tabs = [];
			$scope.tabs.activeTab = 0;
			$scope.$parent.$watch('workbenchtemplatemappingitems', function(newval, oldval){
				if( newval !== undefined){
					var hashmap = {};
					$scope.$parent.workbenchtemplatemappingitems.$promise.then(function(){
						for (var i=0; i< $scope.$parent.workbenchtemplatemappingitems.length; i++) {
							var tablename = $scope.$parent.workbenchtemplatemappingitems[i].TableName;
							var wtmi = $scope.$parent.workbenchtemplatemappingitems[i];
							if(!hashmap[tablename]){
								var tab = { title: '<img src="'+Icons.datamodel.get(tablename)+'"class="specify-icon-16"> '+tablename,
								workbenchtemplatemappingitems: [wtmi]
							};
							
							$scope.tabs.push (tab);
							hashmap[tablename] = tab;
						} else {
							hashmap[tablename].workbenchtemplatemappingitems.push(wtmi)
						
						};
							
						}
					})
				}
			});
			
			$scope.openDataForm = function(row){
				$scope.row = row;
				$scope.dataFormModal.show();
			};
			$scope.FieldTypes = {
				"1" : "text",
				"4" : "bsdate",
				"5" : "number"
			}
			$scope.getFieldType = function(FieldType){
				return $scope.FieldTypes[FieldType];
			}
			

		}
	]);
