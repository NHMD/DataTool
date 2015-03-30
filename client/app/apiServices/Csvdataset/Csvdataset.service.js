'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Csvdataset', function ($resource) {
    // Service logic
    // Public API here
	  return $resource('/api/fileupload/datasets/:collectionname', { id: '@collectionname' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getData': {
		        method:'GET',
	        params: {
	         id: '@collectionname'
	        },
		        url: '/api/fileupload/datasets/:collectionname/objects',
		        isArray: true
		       },
			   saveCsvMapping : {
	  		        method:'POST',
	  		        params: {
	  		         id: '@collectionname'
	  		        },
	  		        url: '/api/fileupload/datasets/:collectionname/mappings/',
	  		        isArray: true
	  		       }
	    });
  });