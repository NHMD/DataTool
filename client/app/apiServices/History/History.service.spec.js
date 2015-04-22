'use strict';

describe('Service: History', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var Discipline;
  beforeEach(inject(function (_History_) {
    History = _History_;
  }));

  it('should do something', function () {
    expect(!!History).toBe(true);
  });

});
