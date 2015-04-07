'use strict';

angular.module('specifyDataCleanerApp')
  .factory('GeologicTimePeriodTreeDefItem', function ($resource) {
    
    // Public API here
	  return $resource('/api/geologictimeperiodtreedefitems/:id', { id: '@GeologicTimePeriodTreeDefItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
