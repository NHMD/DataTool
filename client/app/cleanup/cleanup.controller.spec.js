'use strict';

describe('Controller: CleanupCtrl', function () {

  // load the controller's module
  beforeEach(module('specifyDataCleanerApp'));

  var CleanupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CleanupCtrl = $controller('CleanupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
