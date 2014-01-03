'use strict';

describe('Service: login', function () {

  // load the service's module
  beforeEach(module('thinksterFirebaseWithYeomanApp'));
  // mocked modules
  beforeEach(module(function($provide) {
    $provide.value('Firebase', firebaseStub());
    $provide.value('$location', stub('path'));
    $provide.value('FBURL', 'FAKE_FBURL');
    $provide.value('$firebaseAuth', angularAuthStub());
    
  }));
  

  // instantiate service
  var loginService;
  beforeEach(inject(function (_loginService_) {
    loginService = _loginService_;
  }));

  it('should do something', function () {
    expect(!!loginService).toBe(true);
  });
  
  it('should return error if $firebaseAuth.$login() fails', inject(function($q, $rootScope, loginService, $firebaseAuth){
    var cb = jasmine.createSpy();
    $firebaseAuth.login.andReturn(reject($q, 'test error'));
    loginService.login('test@test.com', '123', null, cb);
    $rootScope.$apply();
    expect(cb).toHaveBeenCalledWith('test error');
  }));
  
  it('should return user if $firebaseAuth.login succeeds',
    inject(function(loginService, $firebaseAuth, $rootScope, $q) {
      var cb = jasmine.createSpy();
      $firebaseAuth.login.andReturn(resolve($q, {hello: 'world'}));
      loginService.login('test@test.com', '123', null, cb);
      $rootScope.$apply();
      expect(cb).toHaveBeenCalledWith(null, {hello: 'world'});
    })
  );

  function stub() {
    var out = {};
    angular.forEach(arguments, function(m) {
      out[m] = jasmine.createSpy();
    });
    return out;
  }
  
  function reject($q, error) {
    var def = $q.defer();
    def.reject(error);
    return def.promise;
  }
  
  function resolve($q, val) {
    var def = $q.defer();
    def.resolve(val);
    return def.promise;
  }
  
  function firebaseStub() {
    // firebase is invoked using new Firebase, but we need a static ref
    // to the functions before it is instantiated, so we cheat here by
    // attaching the functions as Firebase.fns, and ignore new (we don't use `this` or `prototype`)
    var fns = stub('set');
    customSpy(fns, 'child', function() { return fns; });
    
    var Firebase = function() {
      angular.extend(this, fns);
      return fns;
    };
    Firebase.fns = fns;
    
    return Firebase;
  }
  
  function angularAuthStub() {
    var auth = stub('login', 'logout', 'createAccount', 'changePassword');
    auth._authClient = stub('changePassword', 'createUser');
    return auth;
  }
  
  function customSpy(obj, m, fn) {
    obj[m] = fn;
    spyOn(obj, m).andCallThrough();
  }
  
  function ErrorWithCode(code, msg) {
    this.code = code;
    this.msg = msg;
  }
  ErrorWithCode.prototype.toString = function() { return this.msg; };
});

