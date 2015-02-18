'use strict';

describe('Service: TaxonTreeDefItem', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var TaxonTreeDefItem;
  beforeEach(inject(function (_TaxonTreeDefItem_) {
    TaxonTreeDefItem = _TaxonTreeDefItem_;
  }));

  it('should do something', function () {
    expect(!!TaxonTreeDefItem).toBe(true);
  });

});
