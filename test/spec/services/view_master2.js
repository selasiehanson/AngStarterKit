'use strict';

describe('Service: viewMaster2', function () {

  // load the service's module
  beforeEach(module('app'));

  // instantiate service
  var viewMaster2;
  beforeEach(inject(function (_viewMaster2_) {
    viewMaster2 = _viewMaster2_;
  }));

  it('should do something', function () {
    expect(!!viewMaster2).toBe(true);
  });

});
