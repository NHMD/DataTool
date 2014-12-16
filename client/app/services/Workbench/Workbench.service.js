'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Workbench', function ($resource) {
    // Service logic
    // Public API here
	  return $resource('/api/workbenches/:id', { id: '@WorkbenchID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
  });
