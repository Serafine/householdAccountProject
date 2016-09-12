module.exports = function(){
    var express = require('express');
    var bodyParser = require('body-parser');    
    /* create a router object supported by express.
    router uses all methods express uses*/
    var dishRouter = express.Router();
    /* inform express that when the request body contains 
    information in form of json objects, parse them and join
    them to req.body entity */ 
    dishRouter.use(bodyParser.json());
    /*specify URL to use by router*/
    dishRouter.route('/')
    /*this method will be executed without url path*/
    .all(function(req,res,next){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        /*Parsing should continue on - going to specific HTTP method*/
        next();
    })
    .get(function(req,res,next){
        res.end('Will send all the dishes to you');
    })
    .post(function(req,res,next){
        res.end('Will add the dish:' +req.body.name + ' with details: '+ req.body.description);
    })
    .delete(function(req,res,next){
        res.end('Deleting all dishes');
    });
    /*specify second path to router object*/
    dishRouter.route('/:dishId')
    /* get a specific object from a collection by its ID*/
    .get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
    })
    .put(function(req,res,next){
        res.write('Updating the dish ' + req.params.dishId + '\n');
        res.end('Will update details of the dish: ' + req.body.name + ' with detail' + req.body.description);
    })
    .delete(function(req,res,next){
        res.end('Deleting dish: ' + req.params.dishId );
    });
    return dishRouter;
}
