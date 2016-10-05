var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userSchema');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//create a new user account (POST http://localhost:3000/signup)
router.post('/register', function(req,res){
	User.register(new User({username: req.body.username}),
		req.body.password, function(err, user){
			if (err){
				return res.status(500).json({err: err});
			}
			passport.authenticate('local')(req,res, function(){
				return res.status(200).json({status: 'Registration Successfull!'});
			})
		})
	/*
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
	*/
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
