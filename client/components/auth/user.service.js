'use strict';

angular.module('specifyDataCleanerApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }	
      },
		 saveCsvMapping : {
		        method:'POST',
		        params: {
		         id: '@csvname'
		        },
		        url: '/api/users/me/csvimports/:csvname/mappings/',
		        isArray: true
		       }
	  });
  });
