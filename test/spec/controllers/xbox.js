'use strict';

describe('Controller: XboxCtrl', function () {

  // load the controller's module
  beforeEach(module('xboxYoApp'));

  var XboxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    XboxCtrl = $controller('XboxCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
