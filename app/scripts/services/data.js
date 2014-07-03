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
    
    this.users =[
			{ 
				"id": "10203401167644862",
				"gamertag": "OliveKelpie"
			},
			{ "id": "17831886",
				"gamertag": "SatchmoHonky"
			},
			{ "id": "621621993",
				"gamertag": "AdRock1616"
			},
			{
				"id": "895476258463",
				"gamertag": "SomeoneIDoNotKnow"
			}
		];

	this.friends =[
		   {
		      "name": "Eric Richards", 
		      "id": "17831886"
		   }, 
		   {
		      "name": "Adam Richards", 
		      "id": "621621993"
		   }, 
		   {
		      "name": "Linda McNutt", 
		      "id": "706890190"
		   }
		 ];

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

	var me = 

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
		
	}

})
