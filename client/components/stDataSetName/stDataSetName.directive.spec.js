'use strict';

describe('Directive: fixedHeaders', function () {

  // load the directive's module
  beforeEach(module('specifyDataCleanerAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fixed-headers></fixed-headers>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fixedHeaders directive');
  }));
});