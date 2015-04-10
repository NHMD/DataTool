'use strict';

describe('Service: SpecifyUser', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var SpecifyUser;
  beforeEach(inject(function (_SpecifyUser_) {
    SpecifyUser = _SpecifyUser_;
  }));

  it('should do something', function () {
    expect(!!SpecifyUser).toBe(true);
  });

});
