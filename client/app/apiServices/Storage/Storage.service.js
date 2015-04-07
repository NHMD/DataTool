'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Storage', function ($resource) {
    
    // Public API here
	  return $resource('/api/storages/:id', { id: '@StorageID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getParents': {
		        method:'GET',
		        params: {
		         id: '@StorageID'
		        },
		        url: '/api/storages/:id/parents',
		        isArray: false
		       }
	    });
   
  });
