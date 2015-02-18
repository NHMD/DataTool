'use strict';

angular.module('specifyDataCleanerApp')
.directive('moDateInput', function ($window) {
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
            var moment = $window.moment;
            var dateFormat = attrs.moDateInput;
			
			var format = function (value) {
                scope = scope;
                if (!dateFormat || !value) return "";
                var date = moment(value);
				return (date && date.isValid()) ? date.format(dateFormat) : "Invalid date";
            }
			
            attrs.$observe('moDateInput', function (newValue, oldValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
				ctrl.$modelValue = moment(ctrl.$modelValue, oldValue).format(newValue);
				ctrl.$setViewValue(ctrl.$modelValue);
            });
			
			
            ctrl.$formatters.unshift(format);
            ctrl.$parsers.unshift(format);
        }
    };
});