var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');
var specifyModel = require('../../api/mysql');

//var ObjectID = require('mongodb').ObjectID;
var SpecifyModelDescription = require('../../api/mongo/specifymodel/specifymodel.model');

var Promise = require("bluebird");
var MongoDB = require("./nativeMongoInstance");
var _ = require('lodash');



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
			result.each(function(err, elm) {
				if (err) {
					throw err
				};

				var instances = {};

				for (var key in elm) {
					if (key !== "_id" && !isTree(mappings[key].tableName)) {
						if (mappings[key].refTable && !instances[mappings[key].refTable]) {

							instances[mappings[key].refTable] = {};

							instances[mappings[key].refTable][mappings[key].tableName] = {};
						} else if (!mappings[key].refTable && mappings[key].tableName && !instances[mappings[key].tableName]) {
							instances[mappings[key].tableName] = {}
						};

						if (mappings[key].refTable) {
							instances[mappings[key].refTable][mappings[key].tableName][mappings[key].fieldName] = elm[key];
						} else {
							instances[mappings[key].tableName][mappings[key].fieldName] = elm[key];
						}

					} else if (key !== "_id" && isTree(mappings[key].tableName)) {

						//TODO map a single taxon to the tree ???
					};


				};
				specifyModel['Collection'].findOne({
					collectionId: csvimport.specifycollection.collectionId
				})
					.then(function(collection) {
						console.log("XXXXXcollection")
						//	var collectionObj = _.merge(instances['Collectionobject'], {CollectionMemberID: collection.collectionId, CollectionID: collection.collectionId})
						return specifyModel['Collectionobject'].create(_.merge(instances['Collectionobject'], {
							CollectionMemberID: collection.collectionId,
							CollectionID: collection.collectionId
						}))
					})
					.then(function(collectionObject) {
						console.log("XXXXXcollectionObject" + JSON.stringify(collectionObject))
						var det = _.merge(instances['Determination'], {
							CollectionMemberID: collectionObject.CollectionMemberID,
							CollectionObjectID: collectionObject.CollectionobjectID
						});

						console.log("#######   " + JSON.stringify(det))
						return specifyModel['Determination'].create(det)
					})
					.then(function(determination) {
						console.log("XXXXXdetermination")
						return [specifyModel['Agent'].create(instances['Determination']['Agent']), determination]
					})
					.spread(function(agent, determination) {
						console.log("XXXXXagent :")
						return determination.addAgent(agent);
					})
					.then(function() {
						console.log("###############################DONE##################")
					})
					.
				catch (function(err) {
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
	}).exec().then(function(m) {


		var treeIDName = m.idColumn;
		var mdlName = treeIDName.split("ID")[0];
		var treeDefName = mdlName + "TreeDefID";
		var treeDefItemName = mdlName + "TreeDefItemID";

		var treeDefNames = {
			treeIDName: treeIDName,
			mdlName: mdlName,
			treeDefName: treeDefName,
			treeDefItemName: treeDefItemName
		}

		var ranks = _.omit(mappings, function(value, key, object) {
			//	console.log("tredefitem ????? "+ JSON.stringify(object))
			return object[key]["TreeDefItem"] === undefined;
		});

		ranks = _.map(ranks, function(value, key) {
			return _.merge(_.omit(value, 'table'), {
				mongoColumnName: key
			});
		});

		ranks.sort(function(a, b) {
			return a.TreeDefItem.RankID - b.TreeDefItem.RankID;
		});

		var secondaryFields = _.omit(mappings, function(value, key, object) {
			//	console.log("tredefitem ????? "+ JSON.stringify(object))
			return object[key]["TreeDefItem"] !== undefined;
		});

		secondaryFields = _.map(secondaryFields, function(value, key) {
			return _.merge(_.omit(value, 'table'), {
				mongoColumnName: key
			});
		});

		var where = {};
		where[treeDefNames.treeDefName] = discipline[treeDefNames.treeDefName];


		return specifyModel[treeDef].findAll({
			where: where,
			order: 'RankID ASC'
		})
			.then(function(alltreedefitems) {


				// Used to create a dummy tree item to prevent Ophants
				var rootWhere = {};
				rootWhere[treeDefName] = discipline[treeDefName];
				rootWhere['RankID'] = 0;
				var treeRoot = specifyModel[model].findOne({
					where: rootWhere
				})
				var secondLevelTReeDefItem = alltreedefitems[1];
				return [treeRoot, secondLevelTReeDefItem]
			})
			.spread(function(treeRoot, secondLevelTReeDefItem) {

				var dummyParent = {
					RankID: secondLevelTReeDefItem.RankID,
					ParentID: treeRoot[treeIDName],
					Name: 'IMPORTED'
				};
				dummyParent[treeDefName] = treeRoot[treeDefName];
				dummyParent[treeDefItemName] = secondLevelTReeDefItem[treeDefItemName];
				return specifyModel[model].create(dummyParent);
			})
			.then(function(dummyParent) {
				var query = {
					where: {}
				};
				query.where[treeDefName] = discipline[treeDefName];
				return [MongoDB.connect(), dummyParent, specifyModel[model].count(query)]
			})

		.spread(function(db, dummyParent, numTreeNodes) {

			return aggregateTreeLevel(db, ranks, secondaryFields, collectionName, treeDefNames, model, dummyParent, numTreeNodes)

		})
			.
		catch (function(err) {

			console.log(err.message)
			throw err;
		});

	});
}

/*

This function will take a sorted array of tree ranklevels and produce an array og group objects for mongodbs aggregation pipeline
 
*/

function getAggregationQuery(ranks, secondaryFields) {

	var retval = [];
	var firstAggr = {
		$group: {
			_id: {}
		}
	};
	for (var i = 0; i < ranks.length; i++) {

		firstAggr.$group._id[ranks[i].mongoColumnName] = "$" + ranks[i].mongoColumnName;


	}

	for (var i = 0; i < secondaryFields.length; i++) {

		firstAggr.$group._id[secondaryFields[i].mongoColumnName] = "$" + secondaryFields[i].mongoColumnName;


	}

	retval.push(firstAggr);

	for (var i = 1; i < ranks.length; i++) {
		var aggr = {
			$group: {
				_id: {}
			}
		};
		aggr.$group[ranks[ranks.length - i].mongoColumnName] = {
			$addToSet: {}
		};
		aggr.$group[ranks[ranks.length - i].mongoColumnName].$addToSet[ranks[ranks.length - i].mongoColumnName] = "$_id." + ranks[ranks.length - i].mongoColumnName;
		if (i > 1) {
			aggr.$group[ranks[ranks.length - i].mongoColumnName].$addToSet[ranks[ranks.length - i + 1].mongoColumnName] = "$" + ranks[ranks.length - i + 1].mongoColumnName;
		}
		for (var j = 0; j < ranks.length - i; j++) {

			aggr.$group._id[ranks[j].mongoColumnName] = "$_id." + ranks[j].mongoColumnName;

		}
		// If we are at leaf level, add secondary (non tree rank) attributes such as taxon authors, venacular names etc
		if (i === 1) {
			for (var k = 0; k < secondaryFields.length; k++) {
				aggr.$group[ranks[ranks.length - i].mongoColumnName].$addToSet[secondaryFields[k].mongoColumnName] = "$_id." + secondaryFields[k].mongoColumnName;
			}
		}

		retval.push(aggr);
	}
	return retval;

}

function createTreeNode(node, parent, rankLevel, ranks, treeDefNames, model, dummyParent, secondaryFields, t) {

	var name = (rankLevel === 0) ? node._id[ranks[rankLevel].mongoColumnName] : node[ranks[rankLevel].mongoColumnName];
	var where = {
		Name: name,
		RankID: ranks[rankLevel].TreeDefItem.RankID
	};
	where[treeDefNames.treeDefItemName] = ranks[rankLevel].TreeDefItem[treeDefNames.treeDefItemName];
	where[treeDefNames.treeDefName] = ranks[rankLevel].TreeDefItem[treeDefNames.treeDefName];
	if (parent !== dummyParent) {
		where['ParentID'] = parent[treeDefNames.treeIDName];
	}

	// If we are at leaf level, add all secondary attributes (non rank related)
	if (rankLevel === ranks.length - 1) {
		for (var i = 0; i < secondaryFields.length; i++) {
			where[secondaryFields[i].fieldName] = node[secondaryFields[i].mongoColumnName];
		}
	}

	return specifyModel[model].create(
		where, {
			transaction: t
		})
		.then(function(treenode) {
			// If we are at the uppermost treelevel, check if parent exists, or use the dummy	
			if (!treenode.ParentID) {
				treenode.ParentID = dummyParent[treeDefNames.treeIDName];
				treenode.save({
					transaction: t,
					fields: ['ParentID']
				});
			}
			// stop the recursion, leafs are reached
			if (rankLevel === ranks.length - 1) {

				return treenode;
			}
			// continue to next tree level
			else {
				var children = node[ranks[rankLevel + 1].mongoColumnName];
				if (children) {
					var promises = [];
					for (var i = 0; i < children.length; i++) {

						promises.push(createTreeNode(children[i], treenode, rankLevel + 1, ranks, treeDefNames, model, dummyParent, secondaryFields, t));
					}
					return Promise.all(promises)
				}
			}

		});

}

function findOrCreateTreeNode(node, parent, rankLevel, ranks, treeDefNames, model, dummyParent, secondaryFields, t) {

	var name = (rankLevel === 0) ? node._id[ranks[rankLevel].mongoColumnName] : node[ranks[rankLevel].mongoColumnName];
	var where = {
		Name: name,
		RankID: ranks[rankLevel].TreeDefItem.RankID
	};
	where[treeDefNames.treeDefItemName] = ranks[rankLevel].TreeDefItem[treeDefNames.treeDefItemName];
	where[treeDefNames.treeDefName] = ranks[rankLevel].TreeDefItem[treeDefNames.treeDefName];
	if (parent !== dummyParent) {
		where['ParentID'] = parent[treeDefNames.treeIDName];
	}

	// If we are at leaf level, add all secondary attributes (non rank related)
	if (rankLevel === ranks.length - 1) {
		for (var i = 0; i < secondaryFields.length; i++) {
			where[secondaryFields[i].fieldName] = node[secondaryFields[i].mongoColumnName];
		}
	}

	return specifyModel[model].findOrCreate({
		where: where
	}, {
		transaction: t
	})
		.spread(function(treenode, created) {
			// If we are at the uppermost treelevel, check if parent exists, or use the dummy	
			if (created && !treenode.ParentID) {
				treenode.ParentID = dummyParent[treeDefNames.treeIDName];
				treenode.save({
					transaction: t,
					fields: ['ParentID']
				});
			}
			// stop the recursion, leafs are reached
			if (rankLevel === ranks.length - 1) {

				return treenode;
			}
			// continue to next tree level
			else {
				var children = node[ranks[rankLevel + 1].mongoColumnName];
				if (children) {
					var promises = [];
					// if we created the treenode just now, all children will be new treenodes and the select is uneccesary
					if (created) {
						for (var i = 0; i < children.length; i++) {

							promises.push(createTreeNode(children[i], treenode, rankLevel + 1, ranks, treeDefNames, model, dummyParent, secondaryFields, t));
						}
					} else {
						for (var i = 0; i < children.length; i++) {

							promises.push(findOrCreateTreeNode(children[i], treenode, rankLevel + 1, ranks, treeDefNames, model, dummyParent, secondaryFields, t));
						}
					}
					return Promise.all(promises)
				}
			}

		});

}

function aggregateTreeLevel(db, ranks, secondaryFields, collectionName, treeDefNames, model, dummyParent, numTreeNodes) {

	var aggregationQuery = getAggregationQuery(ranks, secondaryFields);

	return db.collection(collectionName).aggregateAsync(aggregationQuery, {
		allowDiskUse: true
	})
		.then(function(result) {
			return [specifyModel.sequelize.transaction({
				autocommit: false,
				isolationLevel: specifyModel.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
			}), result]
		})
		.spread(function(t, result) {
			var promises = [];
			// If there is exactly two treenodes before we start, we will create each node without checking if it exists. The two nodes will be the root and our dummyparent
			if (numTreeNodes === 2) {
				for (var i = 0; i < result.length; i++) {
					promises.push(createTreeNode(result[i], dummyParent, 0, ranks, treeDefNames, model, dummyParent, secondaryFields, t));
				}
			}
			// If there are more treenodes before we start, we should check if each node exists before we create it (will be much slower)
			else {
				for (var i = 0; i < result.length; i++) {
					promises.push(findOrCreateTreeNode(result[i], dummyParent, 0, ranks, treeDefNames, model, dummyParent, secondaryFields, t));
				}
			}

			return [Promise.all(promises), t]
		})

	.spread(function(all, t) {

		return specifyModel[model].findOne({
			where: {
				ParentID: dummyParent[treeDefNames.treeIDName]
			}
		}, {
			transaction: t
		})
			.then(function(treenode) {
				if (!treenode) {
					return dummyParent.destroy({
						transaction: t
					}).then(function() {
						return t.commit();
					});
				} else {
					return t.commit();
				}


			}).
		catch (function(err) {
			t.rollback();
			console.log(err.message)
			throw err;
		})


	});


}



function flattenDiscipline(discipline) {

	var treeDefPattern = /TreeDefID/;
	var flattenedDiscipline = {};
	_.each(discipline, function(value, key) {
		if (treeDefPattern.test(key)) {
			flattenedDiscipline[key] = value;
		}
	})
	if (discipline.division && discipline.division.institution && discipline.division.institution.StorageTreeDefID) {
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
