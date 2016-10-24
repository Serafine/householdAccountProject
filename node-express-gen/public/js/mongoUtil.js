var mongoose = require('mongoose');
var config      = require('../../../config/database'); // get db config file


var _db;

module.exports = {

	connectToServer: function(callback){
		mongoose.connect(config.database);
		_db = mongoose.connection;
	},

	getDb: function(){
		return _db;
	}

};
//taken from: http://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module