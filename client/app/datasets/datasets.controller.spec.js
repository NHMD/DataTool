'use strict';

describe('Controller: DatasetsCtrl', function () {

  // load the controller's module
  beforeEach(module('specifyDataCleanerApp'));

  var DatasetsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatasetsCtrl = $controller('DatasetsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
