'use strict';

angular.module('angularStarterKitApp')
  .controller('LoginCtrl', function ($scope, Auth) {
    
    $scope.login = function() {
      Auth.login({
        email: $scope.email,
        password: $scope.password
      });
    };
  });
