'use strict';

angular.module('specifyDataCleanerApp')
  .factory('StorageTreeDefItem', function ($resource) {
    
    // Public API here
	  return $resource('/api/storagetreedefitems/:id', { id: '@StorageTreeDefItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
