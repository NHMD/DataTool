'use strict';

describe('Controller: CsvTreeUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('specifyDataCleanerApp'));

  var CsvTreeUploadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CsvTreeUploadCtrl = $controller('CsvTreeUploadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
