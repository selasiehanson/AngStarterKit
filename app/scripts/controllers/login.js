'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, Auth) {
    
    $scope.login = function() {
      Auth.login({
        email: $scope.email,
        password: $scope.password
      });
    };
  });
