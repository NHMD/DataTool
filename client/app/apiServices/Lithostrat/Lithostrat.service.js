'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Lithostrat', function ($resource) {
    
    // Public API here
	  return $resource('/api/lithostrats/:id', { id: '@LithostratID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getParents': {
		        method:'GET',
		        params: {
		         id: '@LithostratID'
		        },
		        url: '/api/lithostrats/:id/parents',
		        isArray: false
		       }
	    });
   
  });
