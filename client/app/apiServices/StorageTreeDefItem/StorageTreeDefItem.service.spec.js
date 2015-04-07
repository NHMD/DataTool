'use strict';

describe('Service: StorageTreeDefItem', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerApp'));

  // instantiate service
  var StorageTreeDefItem;
  beforeEach(inject(function (_StorageTreeDefItem_) {
    StorageTreeDefItem = _StorageTreeDefItem_;
  }));

  it('should do something', function () {
    expect(!!StorageTreeDefItem).toBe(true);
  });

});
