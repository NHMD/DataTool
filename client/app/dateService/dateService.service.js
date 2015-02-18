'use strict';

angular.module('specifyDataCleanerApp')
	.factory('DateService', function() {

		var dateFormats = ["yyyy-MM-dd", "dd-MM-yyyy", "MM-dd-yyyy", "yyyy/MM/dd", "dd/MM/yyyy", "MM/dd/yyyy"];
		var dateFormatsDropdown = dateFormats.map(function(e) {

			return {
				"text": e,
				"click": "DateService.setDateFormat(item)"
			}
		});

		var setDateFormat = function(item) {
			service.dateFormat = item.text;
		};

		var getDateFormat = function(){
			return service.dateFormat;
		}


		var service = {
			dateFormats: ["yyyy-MM-dd", "dd-MM-yyyy", "MM-dd-yyyy", "yyyy/MM/dd", "dd/MM/yyyy", "MM/dd/yyyy"],
			dateFormat: dateFormats[0],
			dateFormatsDropdown: dateFormatsDropdown,
			setDateFormat: setDateFormat,
			getDateFormat: getDateFormat


		};

		return service;

	});
