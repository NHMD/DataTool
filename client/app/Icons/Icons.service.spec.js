'use strict';

describe('Service: Icons', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerApp'));

  // instantiate service
  var iconService;
  beforeEach(inject(function (_iconService_) {
    iconService = _iconService_;
  }));

  it('should do something', function () {
    expect(!!iconService).toBe(true);
  });

});
