'use strict';

angular.module('specifyDataCleanerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cleanup', {
        templateUrl: 'app/cleanup/cleanup.html',
        controller: 'CleanupCtrl'
      });
  });
