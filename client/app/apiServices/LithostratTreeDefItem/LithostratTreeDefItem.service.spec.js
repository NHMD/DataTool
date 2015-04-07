'use strict';

describe('Service: LithostratTreeDefItem', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerApp'));

  // instantiate service
  var LithostratTreeDefItem;
  beforeEach(inject(function (_LithostratTreeDefItem_) {
    LithostratTreeDefItem = _LithostratTreeDefItem_;
  }));

  it('should do something', function () {
    expect(!!LithostratTreeDefItem).toBe(true);
  });

});
