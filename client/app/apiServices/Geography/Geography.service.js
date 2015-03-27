'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Geography', function ($resource) {
    
    // Public API here
	  return $resource('/api/geographys/:id', { id: '@GeographyID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getParents': {
		        method:'GET',
		        params: {
		         id: '@GeographyID'
		        },
		        url: '/api/geographys/:id/parents',
		        isArray: false
		       }
	    });
   
  });
