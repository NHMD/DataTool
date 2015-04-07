'use strict';

describe('Service: Lithostrat', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerApp'));

  // instantiate service
  var Lithostrat;
  beforeEach(inject(function (_Lithostrat_) {
    Lithostrat = _Lithostrat_;
  }));

  it('should do something', function () {
    expect(!!Lithostrat).toBe(true);
  });

});
