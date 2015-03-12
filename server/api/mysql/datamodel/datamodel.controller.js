'use strict';
var models = require('../');
var _ = require('lodash');

// Get list of agents
exports.index = function(req, res) {

 return res.json(200, _.filter(Object.keys(models), function(str){ return str  !== 'sequelize' && str  !== 'Sequelize'; }));	
 
};

// Get a single fields for a model
exports.show = function(req, res) {
	console.log(JSON.stringify(req.params))
	var model = req.params.model.charAt(0).toUpperCase() +req.params.model.slice(1);
    models[model].describe().then(function(fields){
  	  
    	return res.json(200, fields);	
    }).catch(function(err){
  	  handleError(res, err);
    });
};


function handleError(res, err) {
  return res.send(500, err);
}