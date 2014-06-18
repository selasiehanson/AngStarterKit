'use strict';

angular.module('angularStarterKitApp')
  .controller('SidebarNavCtrl', function($scope) {
    $scope.links = [{
      path: 'link1',
      name: 'Link One'
    }, {
      path: 'link2',
      name: 'Link Two'
    }, {
      path: 'link3',
      name: 'Link Three'
    }, {
      path: 'link4',
      name: 'Link Four'
    }, {
      path: 'link5',
      name: 'Link Five'
    }, ];
  });