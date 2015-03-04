var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');
var specifyModel = require('../../api/mysql');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;

var Promise = require("bluebird");
var MongoDB = require("./nativeMongoInstance");
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


/*
 *
 * collectionName : The temporary collection in MongoDB
 * mappings : a mappings object posted form the client describing how to map the csv to the Specify model
 * model: which specify model to map e.g. "Agent" or "Collectionobject"
 */


exports.aggregateAndPersist = function(collectionName, mappings, model) {
	var aggregation = {}
	for (var key in mappings) {
		aggregation[mappings[key].fieldName] = "$" + key;
	}


	return MongoDB.connect()
		.then(function(db) {
			return [db.collection(collectionName).aggregateAsync(
				[{
					"$group": {
						"_id": aggregation
					}
				}]
			), db, collectionName]
		})
		.spread(function(result, db, collectionName) {
			var collection = db.collection("mapped_" + model + "_" + collectionName);
			var instances = [];
			for (var i = 0; i < result.length; i++) {
				console.log(result[i]._id);
				var instance = specifyModel[model].findOrCreate({
					where: result[i]._id
				})
					.spread(function(instance, created) {

						return collection.insertAsync(instance.values, {});

					})
					.
				catch (function(err) {
					throw err;
				});
				instances.push(instance);
			}
			return Promise.all(instances);
		})
		.
	catch (function(err) {
		throw err;
	});

}

exports.aggregateTreeAndPersist = function(collectionName, mappings, model, discipline) {
	
	
	var treeDefName = model+"TreeDefID";
	var treeDefItemName = model+"TreeDefItemID"; // extracting Key field names for the relevant tree
	var treeDef = model + "treedefitem";
	//var GeographyTreeDefID = 1; // Hardcoded for test purpose, get it from Discipline
	

	//, order: [[RankID, 'DESC']]
	var where = {
			Name: Object.keys(mappings)
		};
		where[treeDefName] = discipline[treeDefName];
		
	return specifyModel[treeDef].findAll({
		where: where,
		order: [
			['RankID', 'DESC']
		]
	})

	.then(function(treedefitems) {
		
		var rankMappings = {};

		for (var i = 0; i < treedefitems.length; i++) {
			rankMappings[treedefitems[i].Name] = {RankID: treedefitems[i].RankID };
			rankMappings[treedefitems[i].Name][treeDefItemName] = treedefitems[i][treeDefItemName];
		};

		var aggregation = {}
		for (var key in mappings) {
			if (rankMappings[key]) aggregation[key] = "$" + key;
		};
		console.log(aggregation)
		return [MongoDB.connect(), aggregation, collectionName, rankMappings];
	})

	.spread(function(db, aggregation, collectionName, rankMappings) {
		return [db.collection(collectionName).aggregateAsync(
			[{
				"$group": {
					"_id": aggregation
				}
			}]
		), db, collectionName, model, rankMappings]
	})

	.spread(function(result, db, collectionName, model, rankMappings) {


		var collection = db.collection("mapped_" + model + "_" + collectionName);

		var instances = [];
	
		for (var i = 0; i <  result.length ; i++) {
			
			var mapped = [];
			for (var key in result[i]._id) {
				var elm = {RankID: rankMappings[key].RankID, Name: result[i]._id[key] };
				elm[treeDefItemName] = rankMappings[key][treeDefItemName];
				mapped.push(elm)
			};
			
			mapped.sort(function(a,b){
				return a.RankID < b.RankID;
			});
			
			
			var instance = Promise.reduce(mapped, function(previous, query) {
				if(previous) {
					
					return previous;
				}
			    else {
					
					return specifyModel[model].find({
										where: query
							});
						}
				
			}, 0).then(function(treenode) {
				if(!treenode){
					// No match at any level in the tree, create a new root at level 100
					// TODO
				}
				else if(mapped[0].RankID === treenode.RankID){
					// Theres a match at the leaf node, just make the reference i mongodb
					return collection.insertAsync(treenode.values, {});
				}
				else {
					// no exact match at leaf level, but a match at a higher level, make a new leaf under the matched parent
					// at present we set the first existing 'up-tree' node as parent. This could be refined:
					// If theres several missing tree levels these could be create with a promise.reduce chain
					
					var treeNodeDefinition = _.merge(mapped[0], {ParentID: treenode[model+"ID"]});
					treeNodeDefinition[treeDefName] = discipline[treeDefName];
					
					return specifyModel[model].create(newInst)
							.then(function(inserted){
							
								return collection.insertAsync(inserted.values, {});
							})
					
				}

			});
			
			instances.push(instance);
			
		}
		return Promise.all(instances);
	})
		.
	catch (function(err) {
		throw err;
	});



}
