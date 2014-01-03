'use strict';

angular.module('thinksterFirebaseWithYeomanApp')
  .factory('loginService', function ($firebaseAuth, profileCreator, $location, $rootScope) {
    /*global Firebase*/
    return {
      login: function(email, pass, redirect, callback) {
        $firebaseAuth(new Firebase($rootScope.FBURL), $rootScope.LOGINPATH)
        .$login('password', {
          email: email,
          password: pass,
          rememberMe: true
        })
        .then(function(user) {
          if( redirect ) {
            $location.path(redirect);
          }
          if(callback){
            callback(null, user);
          }
        }, callback);
      },
      logout: function(redirectPath) {
        $firebaseAuth.$logout();
        if(redirectPath) {
          $location.path(redirectPath);
        }
      },
      createAccount: function(name, email, pass, callback) {
        $firebaseAuth.$createUser(email, pass, function(err, user) {
          if(callback) {
            callback(err, user);
            $rootScope.$apply();
          }
        });
      },
      createProfile: profileCreator
    };
  });
