'use strict';

describe('Service: Workbench', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var Workbench;
  beforeEach(inject(function (_Workbench_) {
    Workbench = _Workbench_;
  }));

  it('should do something', function () {
    expect(!!Workbench).toBe(true);
  });

});
