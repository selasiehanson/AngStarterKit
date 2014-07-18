'use strict';

angular.module('angularStarterKitApp')
  .controller('DashboardCtrl', function($scope, Store, Model) {
    $scope.objects = [];
    $scope.myData = [{
      name: "Moroni",
      age: 50
    }, {
      name: "Tiancum",
      age: 43
    }, {
      name: "Jacob",
      age: 27
    }, {
      name: "Nephi",
      age: 29
    }, {
      name: "Enos",
      age: 34
    }];

    $scope.gridOptions = {
      data: 'myData',
      columnDefs: [{
        field: 'name',
        displayName: 'Name'
      }, {
        field: 'age',
        displayName: 'Age'
      }]
    };

    $scope.sales = [{
      date: new Date(),
      saleId: 'SAL0001',
      totalAmount: 300,
      details: [{
        name: 'red fish',
        quantity: 5,
        price: 8.95
      }, {
        name: 'salmon',
        quantity: 2,
        price: 12.99
      }]
    }, {
      date: new Date(),
      saleId: 'SAL0001',
      totalAmount: 250,
      details: [{
        name: 'red fish',
        quantity: 5,
        price: 8.95
      }, {
        name: 'salmon',
        quantity: 2,
        price: 12.99
      }]
    }, {
      date: new Date(),
      saleId: 'SAL0001',
      totalAmount: 670,
      details: [{
        name: 'red fish',
        quantity: 10,
        price: 8.95
      }, {
        name: 'salmon',
        quantity: 7,
        price: 12.99
      }]
    }, {
      date: new Date(),
      saleId: 'SAL0001',
      totalAmount: 120,
      details: [{
        name: 'red fish',
        quantity: 3,
        price: 8.95
      }, {
        name: 'salmon',
        quantity: 5,
        price: 12.99
      }]
    }]

    angular.forEach($scope.sales, function(field, index) {
      field.extra = {
        viewDetails: false
      }
    });



  });