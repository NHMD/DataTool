'use strict';

angular.module('specifyDataCleanerApp')
  .factory('GeologicTimePeriod', function ($resource) {
    
    // Public API here
	  return $resource('/api/geographys/:id', { id: '@GeologicTimePeriodID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getParents': {
		        method:'GET',
		        params: {
		         id: '@GeologicTimePeriodID'
		        },
		        url: '/api/geologictimeperiods/:id/parents',
		        isArray: false
		       }
	    });
   
  });
