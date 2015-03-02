var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');
var specifyModel  = require('../../api/mysql');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;

var Promise = require("bluebird");
var MongoDB = require("mongodb");
Promise.promisifyAll(MongoDB);

var _ = require('lodash');
/*
var mappings = {

	"Field Number": {
		fieldName: "FieldNumber",
		tableName: "Collectionobject"
	},
	"Start Date": {
		fieldName: "StartDate",
		tableName: "Collectingevent"
	},
	"Collector First Name1": {
		refTable: "Collector",
		fieldName: "FirstName",
		tableName: "Agent"
	},
	"Collector Last Name1": {
		refTable: "Collector",
		fieldName: "LastName",
		tableName: "Agent"
	},
	"Collector Middle1": {
		refTable: "Collector",
		fieldName: "MiddleInitial",
		tableName: "Agent"
	}

	"Determiner Last Name1": {
		refTable: "Determintation",
		fieldName: "LastName",
		tableName: "Agent"
	},
	"Determiner First Name1": {
		refTable: "Determintation",
		fieldName: "FirstName",
		tableName: "Agent"
	},
	"Determiner Middle1": {
		refTable: "Determintation",
		fieldName: "MiddleInitial",
		tableName: "Agent"
	},
	// "Genus1": {fieldName: , tableName: },
	// "Species1": {fieldName: , tableName: },
	"Remarks 1": {
		fieldName: "Remarks",
		tableName: "Collectionobject"
	},
	// "Gene Sequence 1": {fieldName: , tableName: }
};
*/




	
exports.aggregate = function(collection, mappings, model) {
	var aggregation = {}
	for(var key in mappings){
		aggregation[mappings[key].fieldName] = "$"+key;
	}
	
	
	var client = MongoDB.MongoClient.connectAsync(config.mongo.uri)
	    .then(function(db) {
	        return db.collection(collection).aggregateAsync(
				[{
					"$group": {
						"_id": aggregation
					}
				}]
			);
	    })
	    .then(function(result) {
			var instances = [];
			for(var i=0; i< result.length; i++ ){
				console.log(result[i]._id);
				var instance = specifyModel[model].findOrCreate( {where :result[i]._id})
				.then(function(user){
					console.log(user)
				})
				.catch(function(err){
					console.log(err)
				});
				instances.push(instance);
			}
			return Promise.all(instances);
	    })
	    .catch(function(err) {
	        throw err;
	    });
	
	


}

