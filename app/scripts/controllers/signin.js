'use strict';

angular.module('thinksterFirebaseWithYeomanApp')
  .controller('SigninCtrl', function($scope, loginService, $location) {
  
    if (!!$scope.auth) {
      $location.path('/');
    }
    
    $scope.$on('angularFireAuth:login', function () {
      $location.path('/');
    });
    
    $scope.email = null;
    $scope.pass = null;
    $scope.name = null;
    
    $scope.login = function(callback) {
      $scope.err = null;
      loginService.login($scope.email, $scope.pass, '/', function(err, user) {
        $scope.err = err||null;
        if(typeof(callback) === 'function'){
          callback(err, user);
        }
      });
    };
  });
