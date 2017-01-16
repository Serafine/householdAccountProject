var Verify = require('./verify');
var express = require('express');
var statisticRouter = express.Router();
var path = require('path');
var mongoUtil = require('../public/js/mongoUtil');
var AccountEntry = require('../models/accountEntrySchema');
var HtmlTable = require("../public/js/createStatisticTable");



statisticRouter.route('/')
// route to a restricted info (GET http://localhost:3000/statistics)
.get(function (req,res, next){
	console.log("Entered statistics route");
	// first step: conntect mongo and get all data entries as json data
	//var db = mongoUtil.getDb();
	AccountEntry.find({}, function(err, docs){
		console.log(docs);
		if (err){
			res.status(500).end();
		}
		var newTable = HtmlTable.createStatisticsTable(docs);
		if (newTable.length == 0){
			console.log("Error! No table written");
		}
		// send table to browser
		res.set('Content-Type', 'text/html');
		res.send(newTable);
	});
	//var allEntries = db.collection("accountentries").find();
	// send json data to js script which creates html for table

})


.post(function(req,res){
	var newEntry = new AccountEntry(
	{
		description: req.body.description, 
		date: req.body.date,
		amount: req.body.amount,
		user: req.body.user,
		category: req.body.category
	}
	)
	newEntry.save(function(err,data){
		if (err) {
			console.log(err.errors);
			if (err.errors["description"]){
				if (err.errors["description"].kind === "required"){
					res.status(500).send("Description of data entry is missing");
				}
				else if	(err.errors["description"].kind ===  "minlength"){
					res.status(500).send("Description of data entry is too short");
				}
			}
			else if (err.errors["amount"]){
				if(err.errors["amount"].kind === "min"){
					res.status(500).send("Amount of data entry can not be less than one.");
				}
				else if(err.errors["amount"].kind === "required"){
					res.status(500).send("Amount of data entry is missing");
				}
				else if(err.errors["amount"].kind === "Number"){
					res.status(500).send("Field amount can not be a string.");
				}
			}			
		}
		else{
			console.log("Saved: ", data);
			res.status(200).send("Data saved");
		} 
	});
});

module.exports = statisticRouter;