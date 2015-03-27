'use strict';

describe('Service: GeographyTreeDefItem', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerApp'));

  // instantiate service
  var TaxonTreeDefItem;
  beforeEach(inject(function (_GeographyTreeDefItem_) {
    GeographyTreeDefItem = _GeographyTreeDefItem_;
  }));

  it('should do something', function () {
    expect(!!GeographyTreeDefItem).toBe(true);
  });

});
