'use strict';

describe('Controller: EmployeeCtrl', function () {

  // load the controller's module
  beforeEach(module('angularStarterKitApp'));

  var EmployeeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeeCtrl = $controller('EmployeeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
