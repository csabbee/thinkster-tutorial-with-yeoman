'use strict';

describe('Service: profileCreator', function () {

  // load the service's module
  beforeEach(module('thinksterFirebaseWithYeomanApp'));

  // instantiate service
  var profileCreator;
  beforeEach(inject(function (_profileCreator_) {
    profileCreator = _profileCreator_;
  }));

  it('should do something', function () {
    expect(!!profileCreator).toBe(true);
  });

});
