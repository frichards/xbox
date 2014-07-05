var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var FB = require('fb');
var mongoose = require('mongoose');
var app = express();
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
});


var userSchema = mongoose.Schema({
    id: Number,
    name: String,
    gamertag: String
});

var User = mongoose.model('User', userSchema);

app.get('/', function(req, res){
	User.find({},function(err, user){
		res.send(user);
		console.log(user);
	});
});

app.post('/', function(req, res){
	var user = new User(req.body);
	user.save(function(err, user){
		res.send(user);
		console.log(user);
	})
});