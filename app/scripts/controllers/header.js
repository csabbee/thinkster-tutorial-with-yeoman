'use strict';

angular.module('thinksterFirebaseWithYeomanApp')
  .controller('HeaderCtrl', function($scope, $location, loginService, $firebase, FBURL) {
    /*global Firebase */
    $scope.$on('angularFireAuth:login', function() {
      $firebase(new Firebase(FBURL+'/users/'+$scope.auth.id)).$bind($scope, 'user');
    });
    
    $scope.logout = function() {
      loginService.logout('/signin');
    };
    
    $scope.navbarEntries = [
    ];
  });
