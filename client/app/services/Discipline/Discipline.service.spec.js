'use strict';

describe('Service: Discipline', function () {

  // load the service's module
  beforeEach(module('specifyDataCleanerAppApp'));

  // instantiate service
  var Discipline;
  beforeEach(inject(function (_Discipline_) {
    Discipline = _Discipline_;
  }));

  it('should do something', function () {
    expect(!!Discipline).toBe(true);
  });

});
