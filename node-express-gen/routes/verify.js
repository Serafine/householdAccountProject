var User = require('../models/userSchema');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config/database');

/**
 * [Returns a JWT object with a period for expiration]
 * @param  {[Schema object]} user [A user defined by UserSchema]
 * @return {[JWT]}      [A JWT object]
 */
exports.getToken = function (user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 3600
    });
};

/**
 * Function defines process to verify input data for login of User
 * @param  {HTTP request}   req  [HTTP request]
 * @param  {HTTP response}   res  [HTTP response]
 * @param  {Function} next [description]
 * @return {function}        [function of next module in stack to be called]
 */
exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    console.log(req.headers);
    var token = req.body.token || req.query.token || req.headers['authorization'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};