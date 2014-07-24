'use strict';

angular.module('app')
  .controller('MasterCtrl', function ($scope, $rootScope) {
    $scope.classes = {
      sidebar: '',
      main: ''
    };

    function showSideBar(){
      $scope.isSideBarVisible = true;
      $scope.classes.sidebar = 'col-sm-3 col-md-2 sidebar';
      $scope.classes.main = 'col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main';
    }

    function hideSideBar(){
      $scope.isSideBarVisible = false;
      $scope.classes.main = 'col-sm-12 col-md-12 main';
    }

    showSideBar();
    $rootScope.$on('MSG:hide-sidebar', function (){
      hideSideBar();
    });


  });
