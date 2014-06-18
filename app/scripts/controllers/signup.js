'use strict';

angular.module('angularStarterKitApp')
  .controller('SignupCtrl', function ($scope, Auth) {
    $scope.signup = function() {
      Auth.signup({
        email: $scope.email,
        password: $scope.password
      });
    };
  });
