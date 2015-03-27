'use strict';

describe('Service: Geography', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerApp'));

  // instantiate service
  var Taxon;
  beforeEach(inject(function (_Geography_) {
    Geography = _Geography_;
  }));

  it('should do something', function () {
    expect(!!Geography).toBe(true);
  });

});
