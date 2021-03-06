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
				console.log('The good data', data);
				d.resolve(data);
			}).error(function (err){
				d.reject(err);
			});
			return d.promise;
		};

	this.getGamerInfo = function(user){
		var d = $q.defer();
		$http({
			method: 'POST',
			url: 'http://localhost:8470/getuser',
			data: {user: user}
		}).success(function(data){
			console.log("THE DDDDAAATTATAAA", data)
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
    			facebook_id: newObj.facebook_id,
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


	this.xboxData = function(){
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

	this.xboxProfile = function(){
     	console.log("Profile is getting hit");
		var d = $q.defer();
		$http({
			method:'GET',
			url: 'http://localhost:8470/   '
		}).success(function(data){
			d.resolve(data);
		}).error(function (err){
			d.reject(err);
		});
		return d.promise;
		};


});
