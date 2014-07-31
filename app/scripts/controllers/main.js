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
     console.log("facebook auth called");
}]);

angular.module('xboxYoApp')
  .controller('MainCtrl', function ($scope, DataService, Facebook) {

  $scope.facebookReady = false;

  $scope.login = function() {
    console.log("login");
    Facebook.login(function(response) {
      if (response.status == 'connected') {
        $scope.logged = true;
        $scope.checkUserAgainstSystem();
      }
    }, 
    {scope:"user_friends, email, public_profile"});
  };

    $scope.IntentLogin = function() {
    console.log("IntentLogin");
    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        $scope.logged = true;
        $scope.checkUserAgainstSystem();
      }
      else
        $scope.login();
    });
  };

  $scope.$watch(function() {
    return Facebook.isReady(); 
  }, function(newVal) {
    if ($scope.facebookReady === false){
      $scope.facebookReady = true; 
      $scope.IntentLogin();
    }
  });

  $scope.logout = function() {
    Facebook.logout(function() {
      $scope.$apply(function() {
        $scope.user   = {};
        $scope.friends ={};
        $scope.logged = false; 
        location.reload(); 
      });
    });
  }

  $scope.spin = true;
  $scope.content = false;

  $scope.checkUser= function(){
    for (var i = 0; i < $scope.users.length; i++) {
      if ($scope.user.id !== $scope.users[i].facebook_id) {
        if($scope.users.length === i+1) {
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
              $scope.checkUserAgainstSystem();
            } else {
              getTag();
            }
          };
        } 
      }
      else if($scope.user.id === $scope.users[i].facebook_id){
        console.log("An existing user");
        $scope.user.gamertag=$scope.users[i].gamertag;
        DataService.getGamerInfo($scope.user.gamertag).then(
          function(data){
            console.log(data);
            $scope.xboxInfo=data.results;
            $scope.secondChunk();
            console.log("hooray some data",$scope.xboxInfo.me[0]);
            $scope.user.gamerScore = $scope.xboxInfo.me[0].gamerScore;
            $scope.user.avatar = $scope.xboxInfo.me[0].avatar;
            $scope.spin = false;
            $scope.content = true;
          }
        );
      }
    }
  };

  $scope.secondChunk= function (){
  $scope.notFriends = false;
  Facebook.api('me/friends?fields=picture.type(normal),name,id', function(res) {
    $scope.$apply(function(){
      console.log("FB firneds",res);
      DataService.getUsers().then(
        function(){ 
          if (res.data.length<1){
            $scope.friends = "You are the first one out of your friends to use this app."
          }
          else{
            $scope.friends = res.data;
            console.log($scope.users);
            console.log("xboxinfo got passed", $scope.xboxInfo);
            for (var i = 0; i < $scope.friends.length; i++) {
              for (var j = 0; j < $scope.users.length; j++) {
                if ($scope.friends[i].id === $scope.users[j].facebook_id){
                  $scope.friends[i].gamertag= $scope.users[j].gamertag;
                  for (var k = 0; k < $scope.xboxInfo.friends.length; k++) {
                    if ($scope.friends[i].gamertag===$scope.xboxInfo.friends[k].friendGamertag.text){
                      $scope.friends[i].gamerScore=$scope.xboxInfo.friends[k].friendGamerScore;
                      $scope.friends[i].status="friend"
                      i++;
                
                    }
                    else{
                      $scope.friends[i].gamerScore ="Not friend on xbox Live yet";
                      $scope.friends[i].status="nofriend"
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

  $scope.checkUserAgainstSystem = function() {
    Facebook.api('/me?fields=picture.type(normal),name,id,email', function(response) {
      $scope.$apply(function() {

        $scope.user = response;
        //get users from api
        console.log("got user login info", $scope.user);
        DataService.getUsers().then(
          function(users){
            console.log(users)
            $scope.users=users;
            if(users.length === 0){
             getTag();
              $scope.checkUserAgainstSystem();
            }
            else {
             $scope.checkUser();
            };
          }
        )
      })
    })
  }  


});
