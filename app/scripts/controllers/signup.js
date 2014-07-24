'use strict';

angular.module('app')
  .controller('SignupCtrl', function ($scope, Auth) {
    $scope.signup = function() {
      Auth.signup({
        email: $scope.email,
        password: $scope.password
      });
    };
  });
