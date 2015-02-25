'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Csvdataset', function ($resource) {
    // Service logic
    // Public API here
	  return $resource('/api/fileupload/collections/:collectionname', { id: '@collectionname' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getData': {
		        method:'GET',
	        params: {
	         id: '@collectionname'
	        },
		        url: '/api/fileupload/collections/:collectionname/objects',
		        isArray: true
		       }
	    });
  });