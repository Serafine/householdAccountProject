/**
 * This file contains the user model used for user authentication 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//var bcrypt = require('bcrypt');

//set up a mongoose model


var UserSchema = new Schema({
    username: String,
    password: String,
    admin:   {
        type: Boolean,
        default: false
    }
});
/**
var UserSchema = new Schema ({
	name: {
		type: String,
		unique: true,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	admin:{
		type: Boolean,
		default: false
	}
});
**/

UserSchema.plugin(passportLocalMongoose);

// pre hook is used to define the flow of middleware.
// In this case middleware is executed one after another, when middleware
// calles next()
/**
UserSchema.pre('save', function(next){
	var user = this;
	if(this.isModified('password')||this.isNew){
		bcrypt.genSalt(10, function(err, salt){
			if(err){
				return next(err);
			}
			// as password shall not be saved in clear text it is encrypted and stored as this 
			// value in the DB
			bcrypt.hash(user.password, salt, function(err, hash){
				if (err){
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	};
});
**/

/**
 * compare password from request with password in DB. As both are encrypted extra attention is necessary, no String compare.
 * @param  {[type]}   passw [password from request]
 * @param  {Function} cb    [callback function]
 * @return {[type]}         [callback function]
 */
UserSchema.methods.comparePassword = function (passw, cb){
	bcrypt.compare(passw, this.password, function(err, isMatch){
		if (err){
			return cb(err);
		}
		cb(null, isMatch);
	});
}

module.exports = mongoose.model('User', UserSchema);