'use strict';

angular.module('specifyDataCleanerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/view-tree/:treename?', {
        templateUrl: 'app/view-tree/view-tree.html',
        controller: 'ViewTreeCtrl'
      });
  });
