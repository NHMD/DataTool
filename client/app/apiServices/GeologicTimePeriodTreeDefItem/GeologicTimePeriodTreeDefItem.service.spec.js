'use strict';

describe('Service: GeologicTimePeriodTreeDefItem', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerApp'));

  // instantiate service
  var GeologicTimePeriodTreeDefItem;
  beforeEach(inject(function (_GeologicTimePeriodTreeDefItem_) {
    GeologicTimePeriodTreeDefItem = _GeologicTimePeriodTreeDefItem_;
  }));

  it('should do something', function () {
    expect(!!GeologicTimePeriodTreeDefItem).toBe(true);
  });

});
