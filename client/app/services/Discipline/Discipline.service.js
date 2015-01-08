'use strict';

angular.module('specifyDataCleanerApp')
  .factory('Discipline', function ($resource) {
    // Service logic
    // Public API here
	  return $resource('/api/disciplines/:id', { id: '@disciplineId' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
  });