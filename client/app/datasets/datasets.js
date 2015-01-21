'use strict';

angular.module('specifyDataCleanerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/datasets', {
        templateUrl: 'app/datasets/datasets.html',
        controller: 'DatasetsCtrl',
      });
  });
