'use strict';

describe('Service: dateService', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var dateService;
  beforeEach(inject(function (_dateService_) {
    dateService = _dateService_;
  }));

  it('should do something', function () {
    expect(!!dateService).toBe(true);
  });

});
