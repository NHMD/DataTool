var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');
var specifyModel = require('../../api/mysql');

//var ObjectID = require('mongodb').ObjectID;
var SpecifyModelDescription = require('../../api/mongo/specifymodel/specifymodel.model');

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

exports.insertIntoSpecify = function(collectionName, csvimport) {
	
	var mappings = csvimport.mapping;
	
	csvimport.specifycollection
	
	return MongoDB.connect()
		.then(function(db) {
			return db.collection(collectionName).findAsync(
				
			);
		})
		.then(function(result) {
			
		//	var instances = [];
			result.each(function(err,elm){
				if (err) {throw err};
				
				var instances = {};
				
				for (var key in elm) {
					if(key !== "_id" && !isTree(mappings[key].tableName))
					{
						if(mappings[key].refTable && !instances[mappings[key].refTable]){
							
							instances[mappings[key].refTable] = {};
							
							instances[mappings[key].refTable][mappings[key].tableName] = {};
						}
						
						else if(!mappings[key].refTable && mappings[key].tableName && !instances[mappings[key].tableName] ){
							instances[mappings[key].tableName] = {}
						};
						
						if(mappings[key].refTable){
							instances[mappings[key].refTable][mappings[key].tableName][mappings[key].fieldName] = elm[key];
						}
						else {
						instances[mappings[key].tableName][mappings[key].fieldName] = elm[key];
					}
						
					} else if(key !== "_id" && isTree(mappings[key].tableName)){
						
						//TODO map a single taxon to the tree ???
					};
					
		
				};
				specifyModel['Collection'].findOne({collectionId: csvimport.specifycollection.collectionId})
				.then(function(collection){
					console.log("XXXXXcollection")
				//	var collectionObj = _.merge(instances['Collectionobject'], {CollectionMemberID: collection.collectionId, CollectionID: collection.collectionId})
					return specifyModel['Collectionobject'].create(_.merge(instances['Collectionobject'], {CollectionMemberID: collection.collectionId, CollectionID: collection.collectionId}))
				})
				.then(function(collectionObject){
					console.log("XXXXXcollectionObject"+JSON.stringify(collectionObject))
					var det = _.merge(instances['Determination'],{CollectionMemberID: collectionObject.CollectionMemberID, CollectionObjectID : collectionObject.CollectionobjectID });
					
					console.log("#######   "+JSON.stringify(det))
					return specifyModel['Determination'].create(det)
				})
				.then(function(determination){
					console.log("XXXXXdetermination")
					return [specifyModel['Agent'].create(instances['Determination']['Agent']), determination]
				})
				.spread(function(agent, determination){
					console.log("XXXXXagent :")
					return determination.addAgent(agent);
				})
				.then(function(){
					console.log("###############################DONE##################")
				})
				.catch(function(err){
					console.log(err.message);
					throw err;
				})
			//	var collectionObject = specifyModel['Collectionobject'].build(instances['Collectionobject']);
				
			//	var determination = specifyModel['Determination'].build(instances['Determination']);
				
			//	console.log(JSON.stringify(determination))
				
			//	console.log(JSON.stringify(instances))
				
			})
		
			
		//	return Promise.all(instances);
		})
		.
	catch (function(err) {
		throw err;
	});

}



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
	
	// flattenDsicipline is attaching the StorageTreeDef on same level as other trees
	discipline = flattenDiscipline(discipline);

	var treeDef = model + "treedefitem";
	
	return SpecifyModelDescription.findOne({
		table: model.toLowerCase()
	}).exec().then(function(m){
				
		//-----------------
		var treeIDName = m.idColumn;
		var mdlName = treeIDName.split("ID")[0];
		var treeDefName = mdlName + "TreeDefID";
		var treeDefItemName = mdlName + "TreeDefItemID"; 
		//----------------------------------------------------------	
	
	var ranks = _.omit(mappings, function(value, key, object) {
		return object["rankName"] !== undefined;
		});
	
	var where = {
		Name: _.map(ranks, function(val, key) {
			return ranks[key].rankName
		})
	};
	where[treeDefName] = discipline[treeDefName];

	return specifyModel[treeDef].findAll({
		where: where,
		order: 'RankID ASC'
	})

	.then(function(treedefitems) {

		var rankMappings = {};

		for (var i = 0; i < treedefitems.length; i++) {
			rankMappings[treedefitems[i].Name] = {
				RankID: treedefitems[i].RankID
			};
			rankMappings[treedefitems[i].Name][treeDefItemName] = treedefitems[i][treeDefItemName];
		};

		var aggregation = {}

		for (var key in mappings) {
			//if (rankMappings[mappings[key].rankName]) aggregation[key] = "$" + key;
			aggregation[key] = "$" + key;;
		};

		// Used to create a dummy tree item to prevent Ophants
		var rootWhere = {};
		rootWhere[treeDefName] = discipline[treeDefName];
		rootWhere['RankID'] = 0;
		var treeRoot = specifyModel[model].findOne({where: rootWhere})
		var secondLevelTReeDefItem = treedefitems[1];
		
		return [MongoDB.connect(), aggregation, collectionName, rankMappings, treeRoot, secondLevelTReeDefItem];
	})
	
	
	.spread(function(db, aggregation, collectionName, rankMappings, treeRoot, secondLevelTReeDefItem) {
		
		var dummyParent ={RankID: secondLevelTReeDefItem.RankID, ParentID: treeRoot[treeIDName], Name: 'IMPORTED' };
		dummyParent[treeDefName] = treeRoot[treeDefName];
		dummyParent[treeDefItemName] = secondLevelTReeDefItem[treeDefItemName];
		return [db.collection(collectionName).aggregateAsync(
			[{
				"$group": {
					"_id": aggregation
				}
			}]
		), model, rankMappings, specifyModel[model].create(dummyParent) /* specifyModel.sequelize.transaction({isolationLevel : specifyModel.sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED})*/]
	})

	.spread(function(result, model, rankMappings, dummyParent) {
		

	

		var instances = [];
		
		// Attributes which are not associated with tree rank will be attached to the highest resoluted tree node, e.g. species if we have: Family, Genus, Species in the flat CSV:
		var nonRankMappings  = _.omit(mappings, function(value, key, object) {
			
		return object[key]["rankName"] !== undefined;
});
		for (var i = 0; i < result.length; i++) {
			instances.push(findAndInsert(result[i], model, rankMappings, mappings, treeDefItemName, treeDefName, discipline, nonRankMappings, dummyParent));


		}
		return [Promise.all(instances), dummyParent];
	}).spread(function(instances, dummyParent){
		
	return	[specifyModel[model].count({ where: {ParentID: dummyParent[treeIDName]}}), dummyParent]
		
	}).spread(function(c, dummyParent) {
		if (c === 0){
			return dummyParent.destroy();
		}
		else {
			return true;
		}
		})
		.
	catch (function(err) {
			console.log(err.message)
			console.log(err.errors)
		throw err;
	});

});

}

function findAndInsert(result, model, rankMappings, mappings, treeDefItemName, treeDefName, discipline, nonRankMappings, dummyParent) {

	var mapped = [];
	
	for (var key in result._id) {
		if(mappings[key].rankName){
		var elm = {
			RankID: rankMappings[mappings[key].rankName].RankID,
			Name: result._id[key]
		};

		elm[treeDefItemName] = rankMappings[mappings[key].rankName][treeDefItemName];
		mapped.push(elm)
	}
		
	};

	mapped.sort(function(a, b) {
		return a.RankID > b.RankID;
	});
	// Attributes which are not associated with tree rank will be attached to the highest resoluted tree node, e.g. species if we have: Family, Genus, Species in the flat CSV:
	
	for (var key in nonRankMappings) {
		
		mapped[mapped.length-1][nonRankMappings[key].fieldName] = result._id[key];
	}
	
	return Promise.reduce(mapped, function(previous, query) {

		if (previous !== 0) {

			query = _.merge(query, {
				ParentID: previous[model + "ID"]
			});
		};

		query[treeDefName] = discipline[treeDefName];
		var transaction = specifyModel.sequelize.transaction({isolationLevel : specifyModel.sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE});
		return transaction.then(function(t){
			
			return [specifyModel[model].findOrCreate({
			
				where: query
			}, {transaction: t}), t]
			
			
		})
		.spread(function(treenodeInitialized, t) {
			var treenode = treenodeInitialized[0];
			var initialized = treenodeInitialized[1];
			if(initialized){
				console.log("initalized ******************* "+JSON.stringify(treenode.get()))
				if(!treenode.ParentID){
					treenode.ParentID = dummyParent[model + "ID"];
				}
				return [treenode.save({transaction: t}), t];
			} else 
			{
				return [treenode, t];
			}
		
		}).spread(function(treenode, t){
			
			t.commit();
			return treenode;
			
		})
		
			.
		catch (function(err) {
			console.log(err.message)
			console.log(err.errors)
			throw err;
		});;


	}, 0);


}

function flattenDiscipline(discipline){
	
	var treeDefPattern = /TreeDefID/;
	var flattenedDiscipline = {};
	_.each(discipline, function(value, key){
		if(treeDefPattern.test(key)){
			flattenedDiscipline[key] = value;
		}
	})
	if(discipline.division && discipline.division.institution && discipline.division.institution.StorageTreeDefID)	{
		flattenedDiscipline.StorageTreeDefID = discipline.division.institution.StorageTreeDefID;
	};
	
	return flattenedDiscipline;

}

exports.flattenDiscipline = flattenDiscipline;

function isTree(model) {
	var treedefitem = model + "treedefitem";

	return specifyModel[treedefitem] !== undefined;
}

exports.isTree = isTree;