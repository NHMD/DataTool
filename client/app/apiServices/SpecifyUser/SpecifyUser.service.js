'use strict';

angular.module('specifyDataCleanerApp')
  .factory('SpecifyUser', function ($resource) {
    
    // Public API here
	  return $resource('/api/specifyusers/:id', { id: '@SpecifyUserID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
