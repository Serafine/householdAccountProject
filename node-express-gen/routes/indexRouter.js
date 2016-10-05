var Verify = require('./verify');
var express = require('express');
var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.sendFile('/index.html', { root: path.join(__dirname, '/node-express-gen/public') });
});
module.exports = indexRouter;
