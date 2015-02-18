'use strict';

describe('Directive: moDateInput', function () {

  // load the directive's module
  beforeEach(module('specifyDataCleanerAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mo-date-input></mo-date-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the moDateInput directive');
  }));
});