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
        $scope.fbFriend;
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
    }, {scope:"user_friends, email, public_profile"});
   };

  $scope.checkUserAgainstSystem = function() {
    //get user
    Facebook.api('/me?fields=picture.type(normal),name,id,email', function(response) {
      $scope.$apply(function() {
        $scope.user = response;
        //get users from api
        console.log("got user login info");
        DataService.getUsers().then(
          function(users) {
            $scope.users=users;
            for (var i = 0; i < users.length; i++) {
              if ($scope.user.id !== users[i].facebook_id) {
                if(users.length === i+1) {
                  console.log("getting gamertag info");
                  var getTag = function(){
                    var tag = prompt("Please enter your gamertag on Xbox live.");
                    var r = confirm("Is your gamertag "+tag+" ?");
                    $scope.user.gamertag=tag;
                    if (r === true) {
                      var newObj = {};
                      newObj.facebook_id = $scope.user.id;
                      newObj.name = $scope.user.name;
                      newObj.gamertag = $scope.user.gamertag;
                      console.log(newObj.facebook_id);
                      DataService.postUsers(newObj);
                      console.log("created a new user");
                    }
                    else {
                      getTag();
                    }
                  }
                }
                else {
                  console.log("An existing user") ;
                }
              }
              else if ($scope.user.id === users[i].facebook_id){
                $scope.user.gamertag=users[i].gamertag;
                DataService.getGamerInfo($scope.user.gamertag).then(
                  function(data){
                    console.log(data);
                    $scope.xboxInfo=data.results;
                    secondChunk();
                    console.log("hooray some data",$scope.xboxInfo.me[0]);
                    $scope.user.gamerScore = $scope.xboxInfo.me[0].gamerScore;
                    $scope.user.avatar = $scope.xboxInfo.me[0].avatar;
                    $scope.spin = false;
                    $scope.content = true;
                  }
                );
              }
            }
          }
        )
      });
    });
  };
  function secondChunk(){
    $scope.notFriends = false;
    Facebook.api('me/friends?fields=picture.type(normal),name,id', function(res) {
      $scope.$apply(function(){
        console.log(res);
        DataService.getUsers().then(
          function(){ 
            if (res.data.length<1){
              $scope.friends = "You are the first one out of your friends to use this app."
            }
            else{
              $scope.friends = res.data;
              console.log($scope.users);
              for (var i = 0; i < $scope.friends.length; i++) {
                for (var j = 0; j < $scope.users.length; j++) {
                  if ($scope.friends[i].id === $scope.users[j].facebook_id){
                    $scope.friends[i].gamertag= $scope.users[j].gamertag;
                    for (var k = 0; k < $scope.xboxInfo.friends.length; k++) {
                      if ($scope.friends[i].gamertag===$scope.xboxInfo.friends[k].friendGamertag){
                        $scope.friends[i].gamerScore=$scope.xboxInfo.friends[k].friendGamerScore;
                      }
                      else{
                        $scope.friends[i].gamerScore ="Not friend on xbox Live yet";
                        $scope.notFriends = true;
                        
                      }
                    }
                  }
                }
              }
            };
          }
        )
      });
    });    
  }

	$scope.logout = function() {
    Facebook.logout(function() {
      $scope.$apply(function() {
        $scope.user   = {};
        $scope.friends ={};
        $scope.logged = false;  
      });
    });
  }

  $scope.spin = true;
  $scope.content = false;
});