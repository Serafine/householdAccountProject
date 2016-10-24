/**
 * This file contains the user model used for user authentication 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//set up a mongoose model


var AccountEntrySchema = new Schema({
    description: {
    	type: String,
    	minlength: [1, "Description too short"],
    	required: [true, "Description is required"]
    },
    amount:{
    	type: Number,
    	min: [1, "Amount less than one"],
    	required: [true, "Amount is required"]
    },
    date: { 
    	type: Date, 
    	default: Date.now 
    },
   	user: {
   		type: String,   		
   	},
   	category: {
   		type: String
   	}

});


module.exports = mongoose.model('AccountEntry', AccountEntrySchema);