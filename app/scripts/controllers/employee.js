'use strict';

/**
 * @ngdoc function
 * @name angularStarterKitApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the angularStarterKitApp
 */
angular.module('angularStarterKitApp')
  .controller('EmployeeCtrl', function($scope, Model, Store, ResMgr) {
    $scope.employees = [];
    
    Model.klass('Employee', {
      name: 'attr::string',
      age: 'attr::int',
      department: 'belongsTo::department',
      positions: 'hasMany::position'
    });

    Model.klass('Department', {
      name: 'attr::string'
    });

    Model.klass('Position', {
      name: 'attr::string'
    });

    var employee1 = new App.Employee({
      name: 'Kofi Poku-Duah',
      age: 30
    }).save();

    var department1 = new App.Department({
      id: 1,
      name: 'Housing'
    });

    department1.save();

    new App.Position({
      id: 1,
      name: 'Intern',
    }).save();

    new App.Position({
      id: 2,
      name: 'Cleaner',
    }).save();

    // $scope.employees.push(employee1);
    $scope.edit = function(employee) {
      employee.update();
    }

    window.Store = Store;
    window.Model = Model;
    window.sc = $scope;

    var data = {
      id: 1,
      name: 'kofi',
      age: 45,
      department: 1,
      positions: [2, 4]
    };
    var employee2 = new App.Employee(data);
    employee2.save();
    var all = App.Employee.all();
    console.log(all);
    $scope.employees = all; 

    // console.log(options);
    // var d = Model.transformData('Employee', data);
    // console.log(d);

        // var person = Store.find('Employee', 1);

  });