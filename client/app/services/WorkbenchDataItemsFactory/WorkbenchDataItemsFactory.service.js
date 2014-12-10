'use strict';

angular.module('specifyDataCleanerApp')
  .factory('WorkbenchDataItemsFactory', function ($resource) {

    // Public API here
	  return $resource('/api/workbenchdataitems/:id', { id: '@WorkbenchDataItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
   
  });
