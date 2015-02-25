'use strict';

describe('Controller: CsvUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('specifyDataCleanerApp'));

  var CsvUploadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CsvUploadCtrl = $controller('CsvUploadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
