'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Taxon', function ($resource) {
    
    // Public API here
	  return $resource('/api/taxons/:id', { id: '@TaxonID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      },
		  'getParents': {
		        method:'GET',
		        params: {
		         id: '@TaxonID'
		        },
		        url: '/api/taxons/:id/parents',
		        isArray: false
		       }
	    });
   
  });
