'use strict';

describe('Service: WorkbenchTemplateMappingItemsFactory', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var WorkbenchTemplateMappingItemsFactory;
  beforeEach(inject(function (_WorkbenchTemplateMappingItemsFactory_) {
    WorkbenchTemplateMappingItemsFactory = _WorkbenchTemplateMappingItemsFactory_;
  }));

  it('should do something', function () {
    expect(!!WorkbenchTemplateMappingItemsFactory).toBe(true);
  });

});
