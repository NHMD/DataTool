'use strict';

angular.module('specifyDataCleanerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/datasets/datasets.html',
        controller: 'DatasetsCtrl'
      });
  });