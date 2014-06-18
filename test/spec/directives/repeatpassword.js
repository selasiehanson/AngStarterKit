'use strict';

describe('Directive: repeatPassword', function () {

  // load the directive's module
  beforeEach(module('angularStarterKitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<repeat-password></repeat-password>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the repeatPassword directive');
  }));
});
