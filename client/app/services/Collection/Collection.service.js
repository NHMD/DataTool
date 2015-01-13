'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Collection', function ($resource) {
    // Service logic
    // Public API here
	  return $resource('/api/collections/:id', { id: '@collectionId' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getFromSpecifyuser': {
		        method:'GET',
		        url: '/api/specifyusers/me/collections',
		        isArray: true
		       }
	    });
  });