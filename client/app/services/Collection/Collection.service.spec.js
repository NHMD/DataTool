'use strict';

describe('Service: Collection', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var Collection;
  beforeEach(inject(function (_Collection_) {
    Collection = _Collection_;
  }));

  it('should do something', function () {
    expect(!!Collection).toBe(true);
  });

});
