'use strict';

angular.module('specifyDataCleanerApp')
.directive("stDatasetName", function() {
         return {
                restrict: 'EA',
                require: '^stTable',
                link: function(scope, element, attrs, ctrl) {
					
					
					attrs.$observe(
						"stDatasetName",
						function(newValue, oldValue) {
							if (newValue && newValue !== oldValue) {
			               
			                      var tableState;
			                      tableState = ctrl.tableState();
			                      tableState.search.predicateObject = {};
			                      tableState.pagination.start = 0;
			                      ctrl.pipe();
			                   
							}
						
						}
					);
					
              
                }
              };
    })