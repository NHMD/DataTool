'use strict';

angular.module('specifyDataCleanerApp')
.directive('moDateInput', function ($window) {
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
            var moment = $window.moment;
            var dateFormat = attrs.moDateInput;
			
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
            });
			
			
            ctrl.$formatters.unshift(function (modelValue) {
                scope = scope;
                if (!dateFormat || !modelValue) return "";
                var retVal = moment(modelValue).format(dateFormat);
                return retVal;
            });
			
            ctrl.$parsers.unshift(function (viewValue) {
                scope = scope;
                var date = moment(viewValue);
				return (date && date.isValid()) ? date.format(dateFormat) : "Invalid date";
              
            });
        }
    };
});