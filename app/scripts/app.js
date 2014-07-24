'use strict';

var app = angular.module('app', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'mgcrea.ngStrap',
  'ngGrid',
  'exrails.resourceManager'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  

  
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .state('employees', {
      url: '/employees',
      templateUrl: 'views/employees.html',
      controller: 'EmployeeCtrl'
    })
    .state(
      'login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
    .state(
      'signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      });

    $urlRouterProvider.otherwise('/dashboard');

    // $locationProvider.html5Mode(false);  

});


// app.run(function($rootScope, $location) {
//   $rootScope.$on("$routeChangeStart", function(event, next, current) {
//     alert('')
//     if ($rootScope.loggedInUser == null) {
//       // no logged user, redirect to /login
//       if (next.templateUrl === "partials/login.html") {} else {
//         $location.path("/login");
//       }
//     }
//   });
// });

// app.run(function ($rootScope, $location){

// });
app.run(['$rootScope', '$location', 'Auth',
  function($rootScope, $location, Auth) {

    $rootScope.$on('$locationChangeStart', function(ev, next, current) {

      var scope = $rootScope.$new();

      if (!Auth.isLoggedIn()) {
        scope.$emit('MSG:hide-sidebar');
        if ($location.path() !== '/signup') {
          $location.path('/login');
        }
      } else {
        scope.$emit('MSG:show-sidebar');
        if ($location.path() === '/login' || $location.path() === '/signup') {
          $location.path('/dashboard');
        }
      }
    });
  }
]);