var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var XBoxLive = require('xbox-live');
var app = express();
var api = new XBoxLive();
var request = require("request");

app.use(bodyParser.json());
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
	next();
})
app.listen(8470);

mongoose.connect('mongodb://localhost/xbox-users', function(err){
	if(err) throw err;
	console.log("connected!");
});

var User = mongoose.model('User', 
	new mongoose.Schema({
	    facebook_id: {type:String},
	    name: {type:String},
	    gamertag: {type:String}
}));

app.get('/', function(req, res){
	console.log('Tyleesfefsfesr');
	User.find({},function(err, user){
		console.log('The user is ', user);
		res.send(user);
	});
});

app.post('/getuser', function(req, res){
	request("https://www.kimonolabs.com/api/7w4mgxv0?apikey=kRUXsW4cjDpW5T4g8H4kfncjI7wUc7UT",
		// "https://www.kimonolabs.com/api/7w4mgxv0?apikey=kRUXsW4cjDpW5T4g8H4kfncjI7wUc7UT&kimpath2=" + req.body.user, 
		function(err, response, body) {
		  res.send(response.body);
	});
})

app.post('/', function(req, res){
	var user = new User(req.body);
	user.save(function(err, user){
		res.send({success: true});
		console.log(user);
	})
});