var express     = require('express');
var path 		= require('path')
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('/config/database'); // get db config file
var User        = require('/app/models/user'); // get the mongoose model
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

app.use(express.static(__dirname));

/*
// demo route (GET http://localhost:3000)
app.get('/', function(req,res){
	res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});
*/

//connect to database
mongoose.connect(config.database);

//pass passport for configuration
require('./config/passport')(passport);

//bundle our routes
var routes = express.Router();

//create a new user account (POST http://localhost:3000/signup)
routes.post('/signup', function(req,res){
	console.log(req.headers);
	console.log('bodyName:', req.body.name);
	if (!req.body.name || !req.body.password){
		res.json({success: false, msg:'Please pass name and password!'});
	}
	else{
		var newUser = new User({
			name: req.body.name,
			password: req.body.password
		});
		//save the user
		newUser.save(function(err){
			if (err){
				return res.json({success:false, msg:'Username already exists.'});
			}
			res.json({sucess:true, msg:'Successfull created new user.'})
		});
	}
});

//route to authenticate a user (POST http://localhost:3000/api/authenticate)
routes.post('/authenticate', function(req, res){
	console.log(req.headers);
	console.log('bodyName:', req.body.name);
	User.findOne({
		name: req.body.name
	}, function(err, user){
		if (err) throw err;
		if (!user){
			res.send({success: false, msg: 'Authentication failed. User not found'});
		}
		else{
			// check if password matches
			user.comparePassword(req.body.password, function(err,isMatch){
				if(isMatch && !err){
					//if user is found an password is right, create a token
					var token = jwt.encode(user, config.secret);
					// return the information including token as JSON
					res.json({success: true, token: 'JWT ' + token});
				}
				else{
					res.send({sucess:false, msg:'Authentication failed. Wrong password.'});
				}
			});
		}
	});

});
// route to a restricted info (GET http://localhost:3000/api/statistics)
routes.all('*', passport.authenticate('jwt', {session: false}), function (req,res){
	console.log("Check user authentication");
	console.log(req.headers);
	console.log('bodyName:', req.body.name);
	var token = getToken(req.headers);
	if (token){
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			name: decoded.name
		}, function(err,user){
			if (err) throw err;
			if (!user){
			res.status(403).send({success: false, msg: 'Authentication failed. User not found'});
		}
		else{
			res.json({success: true, msg: 'Welcome to the member area' + user.name + '!' });
			res.sendFile('/statistics.html', { root: path.join(__dirname, '/node-express-gen/public') });
		}
		});
	}
	else{
		return res.status(403).send({success: false, msg:'No token provided'});
	}
});

getToken = function(headers){
	if (headers && headers.authorization){
		var parted = headers.authorization.split(' ');
		if (parted.length === 2){
			return parted[1];
		}
		else{
			return null;
		}		
	}
	else{
		return null;
	}
}


//connect the api routes under /
//app.use('/', routes);
//console.log("Server has started");

app.listen(port);
