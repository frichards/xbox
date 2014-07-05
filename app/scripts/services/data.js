'use strict';

/**
 * @ngdoc service
 * @name xboxYoApp.data
 * @description
 * # data
 * Service in the xboxYoApp.
 */
angular.module('xboxYoApp')
  .service('Data', function Data($http, $q) {
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
    			id: Number,
    			name: String,
    			gamertag: String
				})
			}).success(function(data){
				d.resolve(data);

			}).error(function (err){
				d.reject(err);
			});

		return d.promise;
		};

	// this.friends =[
	// 	   {
	// 	      "name": "Eric Richards", 
	// 	      "id": "17831886"
	// 	   }, 
	// 	   {
	// 	      "name": "Adam Richards", 
	// 	      "id": "621621993"
	// 	   }, 
	// 	   {
	// 	      "name": "Linda McNutt", 
	// 	      "id": "706890190"
	// 	   }
	// 	 ];

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
this.users = this.getUsers();
	this.me = function(user) {
		console.log(user);
		for (var i = 0; i < this.users.length; i++) {
			  if (user.id !== this.users[i].id) {
			  	if(this.users.length === this.users[i]) {
			  		var tag = prompt("Please enter your gamertag on Xbox live.");
       			var r = confirm("Is your gamertag "+tag+" ?");
	       		if (r == true) {
					    var newObj = {};
	       			newObj.id = user.id;
	       			newObj.name = user.name;
	       			newObj.gamertag = tag;
	       			this.postUsers(newObj);
						}
			  	}
					else {
				    this.me;
					}
			}
    }
  }

  this.friends = function(fbFriends) {
  	var arr = [];
  	arr.push(fbFriends);
  	return arr;
  }

	this.xFriends = function(){
		var friends = this.friends;
		var users = this.users;
		var arr = [];
		for (var i = 0; i < friends.length; i++) { 
			for (var k = 0; k < users.length; k++) {
				if (friends[i].id === users[k].id){
					var newObj = {};
					newObj.name = friends[i].name;
					newObj.id = friends[i].id;
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
