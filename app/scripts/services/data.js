'use strict';

/**
 * @ngdoc service
 * @name xboxYoApp.data
 * @description
 * # data
 * Service in the xboxYoApp.
 */
angular.module('xboxYoApp')
  .service('DataService', function Data($http, $q) {
    this.getUsers = function(){
     	console.log("getUsers is getting hit");
		var d = $q.defer();
		$http({
			method:'GET',
			url: 'http://localhost:8470/'
		}).success(function(data){
			d.resolve(data);
		}).error(function (err){
			d.reject(err);
		});
		return d.promise;
		};

	this.postUsers= function(newObj){
		var d = $q.defer();
		$http({
			method:'POST',
			url: 'http://localhost:8470/',
			data: ({
    			id: newObj.id,
    			name: newObj.name,
    			gamertag: newObj.gamertag
			})
		}).success(function(data){
			d.resolve(data);
		}).error(function (err){
			d.reject(err);
		});
		return d.promise;
	};

	this.gamelist = [
		{
			"gamertag": "OliveKelpie",
			"games": ["Final Fantacy XIII", "Lego Star Wars"]
		},
		{
			"gamertag": "SatchmoHonky",
			"games": ["Mass Effect", "Batman: Arkham City"]
		},
		{
			"gamertag": "AdRock1616",
			"games": ["Halo", "Batman: Arkham City"]
		}];

	// this.users = this.getUsers.then();
	// this.users =[{"id": "123", "name":"test"}];

	// this.me = function(user) {
	// 	console.log(user);
	// 	for (var i = 0; i < this.users.length; i++) {
	// 		if (user.id !== this.users[i].id) {
	// 		  	if(this.users.length === i+1) {
	// 		  		var tag = prompt("Please enter your gamertag on Xbox live.");
	//        			var r = confirm("Is your gamertag "+tag+" ?");
	// 	       		if (r === true) {
	// 					var newObj = {};
	// 	       			newObj.id = user.id;
	// 	       			newObj.name = user.name;
	// 	       			newObj.gamertag = tag;
	// 	       			this.postUsers(newObj);
	// 	       			console.log("created a new user")
	// 				}
	// 				else {
	// 				    console.log("An existing user");
	// 				}

	// 			}
	// 		}
 //    	}
 //  	}

  this.friends = function(fbFriends) {
  	var arr = [];
  	for (var i = 0; i < fbFriends.length; i++) { 
		for (var k = 0; k < users.length; k++) {
			if (fbFriends[i].id === users[k].id){
				var newObj = {};
				newObj.name = fbFriends[i].name;
				newObj.id = fbFriends[i].id;
				newObj.gamertag = users[k].gamertag;
				arr.push(newObj);
			};
		};
	};
	return arr;
};


	this.gameSuggestion = function(){
		var xFriends = this.xFriends;
		var gamelist = this.gamelist;
		var arr = [];
	};

});
