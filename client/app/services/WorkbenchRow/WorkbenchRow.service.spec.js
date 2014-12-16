'use strict';

describe('Service: WorkbenchRowsFactory', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var workbenchrowsfactory;
  beforeEach(inject(function (_workbenchrowsfactory_) {
    workbenchrowsfactory = _workbenchrowsfactory_;
  }));

  it('should do something', function () {
    expect(!!workbenchrowsfactory).toBe(true);
  });

});
