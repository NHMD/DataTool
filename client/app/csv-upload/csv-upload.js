'use strict';

angular.module('specifyDataCleanerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/csv-upload', {
        templateUrl: 'app/csv-upload/csv-upload.html',
        controller: 'CsvUploadCtrl'
      });
  });
