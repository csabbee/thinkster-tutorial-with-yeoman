'use strict';

angular.module('thinksterFirebaseWithYeomanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    /*global Firebase */
    $routeProvider
      .when('/', {
        templateUrl: 'views/default.html',
        controller: 'MainCtrl'
      })
      .when('/signin',  {
        templateUrl: 'views/users/signin.html'
      })
      .when('/signup',  {
        templateUrl: 'views/users/signup.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  //  authentication
  .run(['$firebaseAuth', 'FBURL', '$rootScope',
    function($firebaseAuth, FBURL, $rootScope) {
      $firebaseAuth(new Firebase(FBURL), {
        path: '/signin'
      });
      $rootScope.FBURL = FBURL;
    }
  ])
  .constant('FBURL','https://firefootballtutorial.firebaseio.com/');
