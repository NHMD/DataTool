'use strict';

describe('Controller: TaxonbrowserCtrl', function () {

  // load the controller's module
  beforeEach(module('specifyDataCleanerAppApp'));

  var TaxonbrowserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaxonbrowserCtrl = $controller('TaxonbrowserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
