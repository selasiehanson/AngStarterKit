'use strict';

describe('Service: ViewMaster', function () {

  // load the service's module
  beforeEach(module('app'));

  // instantiate service
  var ViewMaster;
  beforeEach(inject(function (_ViewMaster_) {
    ViewMaster = _ViewMaster_;
  }));

  it('should do something', function () {
    expect(!!ViewMaster).toBe(true);
  });

});
