'use strict';

angular.module('specifyDataCleanerApp')
  .factory('DataModel', function ($resource) {
    
    // Public API here
	  
	  return $resource('/api/datamodels/:id');
   
  });
