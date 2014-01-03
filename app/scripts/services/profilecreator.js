'use strict';

angular.module('thinksterFirebaseWithYeomanApp')
  .factory('profileCreator', function (Firebase, FBURL, $rootScope) {
    return function(id, name, email, callback) {
      new Firebase(FBURL).child('users/'+id).set({email: email, name: name}, function(err) {
        if( callback ) {
          callback(err);
          $rootScope.$apply();
        }
      });
    };
  });
