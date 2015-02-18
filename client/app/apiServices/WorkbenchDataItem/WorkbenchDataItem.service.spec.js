'use strict';

describe('Service: WorkbenchDataItemsFactory', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var WorkbenchDataItemsFactory;
  beforeEach(inject(function (_WorkbenchDataItemsFactory_) {
    WorkbenchDataItemsFactory = _WorkbenchDataItemsFactory_;
  }));

  it('should do something', function () {
    expect(!!WorkbenchDataItemsFactory).toBe(true);
  });

});
