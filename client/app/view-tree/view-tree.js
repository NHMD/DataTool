'use strict';

angular.module('specifyDataCleanerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/view-tree', {
        templateUrl: 'app/view-tree/view-tree.html',
        controller: 'ViewTreeCtrl'
      });
  });
