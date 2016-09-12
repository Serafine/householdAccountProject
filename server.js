var express     = require('express');
var path 		= require('path')
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var port        = process.env.PORT || 3000; // means: whatever is in the environment variable PORT, or 3000 if there's nothing there. Port might be automatically configured by another service. If set fix, this might cause a 500 gateway error. 
var jwt         = require('jwt-simple');

//get the request parameters
//
/**Returns middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
extended - parse extended syntax with the qs module. (default: true), if false it will be parsed with the querystring library
**/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// log server process to console. 'dev' creates output colored by response status for development use. The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// use passport package in this application
app.use(passport.initialize());

// demo route (GET http://localhost:3000)
app.get('/', function(req,res){
	res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

app.use(express.static(__dirname + '/public'));

// Start the server
app.listen(port);
console.log('Server started');