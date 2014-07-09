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

angular.module('xboxYoApp')
  .controller('MainCtrl', function ($scope, DataService, Facebook) {

  $scope.facebookReady = false;

	$scope.$watch(function() {
		return Facebook.isReady(); 
	}, function(newVal) {
    if ($scope.facebookReady === false){
      console.log("faceboo ready");
      $scope.facebookReady = true; 
      $scope.IntentLogin();
    }
	});

	$scope.IntentLogin = function() {
    console.log("IntentLogin");
    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        $scope.logged = true;
        $scope.checkUserAgainstSystem();
        $scope.fbFriend(response);
      }
      else
        $scope.login();
    });
  };

  $scope.login = function() {
    console.log("login");
    Facebook.login(function(response) {
      if (response.status == 'connected') {
        $scope.logged = true;
        $scope.checkUserAgainstSystem();
      }
    });
   };

  $scope.checkUserAgainstSystem = function() {
    //get user
    Facebook.api('/me?fields=picture.type(normal),name,id', function(response) {
      $scope.$apply(function() {
        $scope.user = response;
        //get users from api
        console.log("got user info");
        DataService.getUsers().then(
          function(users) {
            console.log(users);
            for (var i = 0; i < users.length; i++) {
              console.log($scope.user.id);
              if ($scope.user.id !== users[i].id) {
                  if(users.length === i+1) {
                    console.log("getting gamertag info");
                    var tag = prompt("Please enter your gamertag on Xbox live.");
                      var r = confirm("Is your gamertag "+tag+" ?");
                      if (r === true) {
                        var newObj = {};
                        newObj.id = $scope.user.id;
                        newObj.name = $scope.user.name;
                        newObj.gamertag = tag;
                        console.log(newObj.id);
                        DataService.postUsers(newObj);
                        console.log("created a new user");
                      }
                      else {
                        console.log("An existing user") ;
                      }

                  }
                }
              }
          }
        )
      });
    });
  };

 // 	$scope.me = function() {
	// 	Facebook.api('/me?fields=picture.type(normal),name,id', function(response) {
	// 		$scope.$apply(function() {
	// 			$scope.user = response;
	// 			// Data.me($scope.user);
	// 		});
	// 	});
	// };
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
        if (res.length<1){
          $scope.friends = "You are the first one out of your friends to user this app."
        }
        else
        {
        $scope.friends = res;
        // Data.friends($scope.friends);
        }

			});
		});
		
	};



});