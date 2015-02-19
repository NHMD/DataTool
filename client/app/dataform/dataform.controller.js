'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DataFormCtrl', ['$rootScope', '$scope', '$modal', 'Icons', 'hotkeys',  '$timeout', 'DataFormService','TaxonBrowserService','DateService',
		function($rootScope, $scope, $modal, Icons, hotkeys,  $timeout, DataFormService, TaxonBrowserService, DateService) {
			$scope.Icons = Icons;
			$scope.DateService = DateService;
			$scope.dataFormModal = $modal({
				scope: $scope,
				template: 'app/dataform/dataform.modal.tpl.html',
				show: false,
				prefixEvent: "dataformmodal"
			});
			
			TaxonBrowserService.selectCallbacks.push(function(){
				
				if($scope.dataFormModal.$isShown){
					$scope.$parent.addTaxonToRow($scope.row);
				}
				
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
								tablename: tablename,
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
				description: 'Jump to previous tab',
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
				description: 'Jump to next tab',
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
				description: 'Jump to first input under selected tab',
				allowIn: ['INPUT'],
				callback: function() {
					$('.tab-pane.active').find("input")[0].focus();
					
				}
			})

		}
	]);
