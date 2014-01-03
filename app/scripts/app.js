'use strict';

angular.module('thinksterFirebaseWithYeomanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/default.html',
        controller: 'MainCtrl'
      })
      .when('/signin',  {
        templateUrl: 'views/users/signin.html'
      })
      .when('/signup',  {
        templateUrl: 'views/users/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  //  authentication
  .run(['FBURL','LOGINPATH','$rootScope',
    function(FBURL, LOGINPATH, $rootScope) {
      $rootScope.FBURL = FBURL;
      $rootScope.LOGINPATH = LOGINPATH;
    }]
  )
  .constant('FBURL','https://firefootballtutorial.firebaseio.com/')
  .constant('LOGINPATH',{ path: '/signin' });
