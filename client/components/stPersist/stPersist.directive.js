'use strict';

angular.module('specifyDataCleanerApp')
	.directive('stPersist', function() {
		return {
			require: '^stTable',
			link: function(scope, element, attr, ctrl) {
				var nameSpace;


				attr.$observe(
					"stPersist",
					function(newValue, oldValue) {
						if (newValue && newValue !== oldValue) {
							nameSpace = newValue;
						}
						
					}
				);



				//save the table state every time it changes
				scope.$watch(function() {
					return ctrl.tableState();
				}, function(newValue, oldValue) {
					if (newValue !== oldValue) {
						localStorage.setItem(nameSpace, JSON.stringify(newValue));
					}
				}, true);

				//fetch the table state when the directive is loaded
				if (localStorage.getItem(nameSpace)) {
					var savedState = JSON.parse(localStorage.getItem(nameSpace));
					var tableState = ctrl.tableState();

					angular.extend(tableState, savedState);
					ctrl.pipe();

				}

			}
		};
	});
