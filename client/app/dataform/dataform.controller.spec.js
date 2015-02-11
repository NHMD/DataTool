'use strict';

describe('Controller: DataformCtrl', function () {

  // load the controller's module
  beforeEach(module('specifyDataCleanerAppApp'));

  var DataformCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataformCtrl = $controller('DataformCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
