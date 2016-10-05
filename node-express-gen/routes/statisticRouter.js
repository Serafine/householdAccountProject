var Verify = require('./verify');
var express = require('express');
var statisticRouter = express.Router();
var path = require('path');

statisticRouter.route('/')
// route to a restricted info (GET http://localhost:3000/statistics)
.get(Verify.verifyOrdinaryUser, function (req,res){
	res.sendFile('/statistics.html', { root: path.join(__dirname, '../public')});
});

module.exports = statisticRouter;