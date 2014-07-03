'use strict';

/**
 * @ngdoc function
 * @name xboxYoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xboxYoApp
 */
angular.module('xboxYoApp')
  .controller('MainCtrl', function ($scope, Data) {
    $scope.friends = Data.xFriends();
  });
