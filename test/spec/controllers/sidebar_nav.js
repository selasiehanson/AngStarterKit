'use strict';

describe('Controller: SidebarNavCtrl', function () {

  // load the controller's module
  beforeEach(module('angularStarterKitApp'));

  var SidebarNavCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidebarNavCtrl = $controller('SidebarNavCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
