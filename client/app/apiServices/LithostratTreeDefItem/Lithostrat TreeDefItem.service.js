'use strict';

angular.module('specifyDataCleanerApp')
  .factory('LithostratTreeDefItem', function ($resource) {
    
    // Public API here
	  return $resource('/api/lithostrattreedefitems/:id', { id: '@LithostratTreeDefItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
