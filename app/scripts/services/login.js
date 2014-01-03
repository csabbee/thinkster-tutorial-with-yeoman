'use strict';

angular.module('thinksterFirebaseWithYeomanApp')
  .factory('login', function ($firebaseAuth, profileCreator, $location, $rootScope) {
    return {
      login: function(email, pass, redirect, callback) {
        var p = $firebaseAuth.$login('password', {
          email: email,
          password: pass,
          rememberMe: true
        });
        p.then(function(user) {
          if( redirect ) {
            $location.path(redirect);
          }
          callback && callback(null, user);
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
