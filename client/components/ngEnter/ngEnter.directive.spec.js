'use strict';

describe('Directive: ngEnter', function () {

  // load the directive's module
  beforeEach(module('specifyDataCleanerAppApp'));

  var element,
	  scope;
	
  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('provide an on-enter event on elements', inject(function ($compile) {
    element = angular.element('<st-persist></st-persist>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngEnter directive');
  }));
});
