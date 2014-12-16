'use strict';

angular.module('specifyDataCleanerApp')
  .factory('WorkbenchDataItem', function ($resource) {

    // Public API here
	  return $resource('/api/workbenchdataitems/:id', { id: '@WorkbenchDataItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getFromWorkbench': {
		        method:'GET',
		        params: {
		         id: '@WorkbenchID'
		        },
		        url: '/api/workbenches/:id/workbenchrows/workbenchdataitems/',
		        isArray: true
		       }
		     }
	    );
   
   
  });
