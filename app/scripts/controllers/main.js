'use strict';

/**
 * @ngdoc function
 * @name xboxYoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xboxYoApp
 */

angular.module('xboxYoApp').config(['FacebookProvider', function(FacebookProvider) {
     // Here you could set your appId through the setAppId method and then initialize
     // or use the shortcut in the initialize method directly.
     FacebookProvider.init('732779943446911');
     console.log("facebook auth called - 1");
}]);

function Cotroller($scope, $http) {
	$scope.IntentLogin = function() {
      Facebook.getLoginStatus(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me(); 
            $scope.fbFriend();
          }
          else
            $scope.login();
      });
   };
  console.log("facebook login called - 2");
}

angular.module('xboxYoApp')
  .controller('MainCtrl', function ($scope, Data, Facebook) {

  $scope.user = {};
	$scope.$watch(function() {
		return Facebook.isReady(); 
	}, function(newVal) {
		$scope.facebookReady = true; 
	});

	$scope.IntentLogin = function() {
        Facebook.getLoginStatus(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me(); 
            $scope.fbFriend();
          }
          else
            $scope.login();
        });
      };

  $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me();
          }
        
        });
       };
 	$scope.me = function() {
		Facebook.api('/me?fields=picture.type(normal),name,id', function(response) {
			$scope.$apply(function() {
				$scope.user = response;
				Data.me($scope.user);
			});
		});
	};
	$scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;  
          });
        });
      }
	

	$scope.fbFriend = function() {
		Facebook.api('/me/friends?fields=picture.type(square),name,id', function(res) {
			$scope.$apply(function(){
				$scope.friends = res;
				Data.friends($scope.friends);
			});
		});
		console.log("")
	};



});