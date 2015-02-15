'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DataFormCtrl', ['$rootScope', '$scope', '$modal', 'Icons', 'hotkeys',  '$timeout', 'DataFormService',
		function($rootScope, $scope, $modal, Icons, hotkeys,  $timeout, DataFormService) {
			$scope.Icons = Icons;
			
			$scope.dataFormModal = $modal({
				scope: $scope,
				template: '/app/dataform/dataform.modal.tpl.html',
				show: false,
				prefixEvent: "dataformmodal"
			});
			
			$scope.$parent.$watch('workbenchtemplatemappingitems', function(newval, oldval){
				if( newval !== undefined){
					
					$scope.$parent.workbenchtemplatemappingitems.$promise.then(function(){
						$scope.tabs = [];
						$scope.tabs.activeTab = 0;
						var hashmap = {};
						for (var i=0; i< $scope.$parent.workbenchtemplatemappingitems.length; i++) {
							var tablename = $scope.$parent.workbenchtemplatemappingitems[i].TableName;
							var wtmi = $scope.$parent.workbenchtemplatemappingitems[i];
							if(!hashmap[tablename]){
								var tab = { title: '<img src="'+Icons.datamodel.get(tablename)+'"class="specify-icon-16"> '+tablename,
								workbenchtemplatemappingitems: [wtmi]
							};
							
							$scope.tabs.push(tab);
							hashmap[tablename] = tab;
						} else {
							hashmap[tablename].workbenchtemplatemappingitems.push(wtmi)
						
						};
							
						}
					})
				}
			});
			
			DataFormService.openDataForm = function(row){
				if(row){
					$scope.row =  row;
					$scope.dataFormModal.show();
				} else {
					$scope.$parent.addRowToGrid().then(function(row){
						$scope.row =  row;
						$scope.dataFormModal.show();
					})
				}
				
				
			};
			
		hotkeys.bindTo($scope)
			.add({
				combo: 'up',
				description: 'Open Taxon browser / Close taxon browser and use selected taxon',
				allowIn: ['INPUT'],
				callback: function() {
			
					if($scope.tabs.activeTab > 0){
						$scope.tabs.activeTab --;
					}
					$timeout(function() {
					$("a[data-index='"+$scope.tabs.activeTab+"']").trigger('click');
				});

				}
			})
			.add({
				combo: 'down',
				description: 'Close Taxon browser and discard selected taxon',
				allowIn: ['INPUT'],
				callback: function() {
					
					if($scope.tabs.activeTab < $scope.tabs.length){
						$scope.tabs.activeTab ++;
					}
					$timeout(function() {
					$("a[data-index='"+$scope.tabs.activeTab+"']").trigger('click');
					});
				}
			})
			.add({
				combo: 'right',
				description: 'Close Taxon browser and discard selected taxon',
				allowIn: ['INPUT'],
				callback: function() {
					$('.tab-pane.active').find("input")[0].focus();
					
				}
			})

		}
	]);
