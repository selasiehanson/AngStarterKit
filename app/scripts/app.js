'use strict';

var app = angular.module('angularStarterKitApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'mgcrea.ngStrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  // app.$locationProvider.html5Mode(true);  

  $urlRouterProvider.otherwise('/dashboard');
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
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