/**
 * This file provides a passport authentication using JSON Web Tokens (JWT)
 * 
 */

var JWTStrategy = require('passport-jwt').Strategy;

//load up the user model
var User = require('../app/models/user');
var config = require('../config/database'); // get db config file

module.exports = function(passport){
	var opts = {};
	opts.secretOrKey = config.secret;
	//jwt_payload is an object literal containing the decoded JWT payload.
	passport.use(new JWTStrategy(opts, function(jwt_payload, done){
		// Method findOne() is used to query db for a single document as ssecond parameter
		/**
		 * This function queries in db for a user with a given id, retrieved from the jwt_payload element
		 * @param  {[type]} query          [queries for user ID]
		 * @param  {[type]} function 		[contains either error, if not found or document of user]
		 **/
		User.findOne({id: jwt_payload.id}, function(err,user){
			if (err) {
				return done(err, false);
			}
			if (user){
				done(null, user);
			}
			else{
				done(null,false);
			}
		});		
	}));
}