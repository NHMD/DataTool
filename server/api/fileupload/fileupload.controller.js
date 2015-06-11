var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');

var fs = require("fs");
var parse = require('csv').parse;
var Promise = require("bluebird");
var MongoDB = require("../../components/datamapper/nativeMongoInstance");
var uploaddir = config.tempuploaddir;
var _ = require('lodash');
var datamapper = require('../../components/datamapper');
var specifyModel = require('../../api/mysql');


function parseCSVFile(sourceFilePath, columns, onNewRecord, handleError, done, delimiter) {
	var source = fs.createReadStream(sourceFilePath);
	var linesRead = 0;
	var parser = parse({
		delimiter: delimiter,
		columns: columns,
		relax: true
	});

	parser.on("readable", function() {
		var record;
		while (record = parser.read()) {
			linesRead++;
			onNewRecord(record);
		}
	});

	parser.on("error", function(error, row) {
		handleError(error)
	});

	parser.on("end", function() {
		done(linesRead);
	});

	source.pipe(parser);
}


exports.getFile = function(req, res) {
	var csvdelimiter = (req.body.csvdelimiter) ? req.body.csvdelimiter : ",";
	var isTreeOnly = (req.body.isTreeOnly) ? req.body.isTreeOnly : false;
	var filePath = req.files.file.path;
	var collName = "csv_temp_" + req.files.file.name.split(".")[0];

	var rows = [];

	function onNewRecord(record) {
		rows.push(record);
	}

	function onError(error) {
		console.log(error)
	}

	function done(linesRead) {
		MongoDB.connect().then(function(db) {
			var collection = db.collection(collName);
			collection.insert(rows, function(err, docs) {
				if (err) throw err;
				fs.unlink(filePath);
			});
		})
			.then(function() {
				var imported = {
					name: req.files.file.originalname,
					collectionname: collName,
					active: true,
					uploadedToSpecify: false,
					isTreeOnly: isTreeOnly
				};
				req.user.csvimports.push(imported);
				req.user.save(function(err) {
					if (err) throw err;
					res.send(200, imported);
				});
			})
	}
	var columns = true;
	parseCSVFile(filePath, columns, onNewRecord, onError, done, csvdelimiter);
};

exports.find = function(req, res) {
	var limit = parseInt(req.query.limit) || 100;
	var offset = parseInt(req.query.offset) || 0;
	MongoDB.connect().then(function(db) {
		db.collection(req.params.collname, function(err, collection) {
			if (err) throw err;
			collection.stats(function(err, stats) {
				res.send(200, {
					collectionname: req.params.collname,
					count: stats.count,
					size: stats.size,
				});
			});
		});
	})
}

exports.findObject = function(req, res) {
	MongoDB.connect().then(function(db) {
		db.collection(req.params.collname, function(err, collection) {
			collection.find({
				_id: MongoDB.ObjectID(req.params.id)
			}).toArray(function(err, docs) {
				console.log(req.params.id)
				if (err) throw err;
				res.send(200, docs[0]);

			});
		});
	})
}

//return an empty set of fields for the passed collection
function returnEmptyFieldList(collection, res) {
	collection.find({}).limit(1).toArray(function(err, docs) {
		if (err) throw err;
		for (var key in docs[0]) {
			docs[0][key]='';
		}
		res.send(200, docs);
	});
}

exports.indexObjects = function(req, res) {
	var limit = parseInt(req.query.limit) || 100;
	var offset = parseInt(req.query.offset) || 0;
	var	sort = parseInt(req.query.sort) || 1;
	var	orderBy = req.query.orderBy || false;
	var	filterParam = req.query.filter ? JSON.parse(req.query.filter) : {};
	var filter = {};

	for (var key in filterParam) {
		//the key can be "enriched"	with backslashes and quotes
		//we need a clean {'x': /x/} object
		var trimmedKey = key.replace(/\W/g, '');
		filter[trimmedKey]=new RegExp(filterParam[key].toString());
	}

	MongoDB.connect().then(function(db) {
		db.collection(req.params.collname, function(err, collection) {
			//TODO the orderBy distinction should be refactored
			if (orderBy) {
				collection.find(filter).sort(orderBy, sort).skip(offset).limit(limit).toArray(function(err, docs) {
					if (docs.length>0) {
						res.send(200, docs);
					} else {
						returnEmptyFieldList(collection, res);
					}
				});
			} else {
				collection.find(filter).skip(offset).limit(limit).toArray(function(err, docs) {
					if (docs.length>0) {
						res.send(200, docs);
					} else {
						returnEmptyFieldList(collection, res);
					}
				});
			}
		});
	})
}

//return array of fields for the collection
exports.getFields = function(req, res) {
	MongoDB.connect().then(function(db) {
		db.collection(req.params.collname, function(err, collection) {
			collection.find({}).limit(1).toArray(function(err, docs) {
				if (err) throw err;
				var fields = { fields : [] };
				for (var key in docs[0]) {
					fields.fields.push(key);
				}
				res.send(200, fields);
			});
		});
	});
}

function searchReplace(collname, field, search, replace) {
	MongoDB.connect().then(function(db) {
		db.collection(collname, function(err, collection) {
			collection.find( { field : _id }).toArray(function(err, docs) {
				console.log(docs);
			})
		})
	})
}

exports.updateObject = function(req, res) {
	var action = req.body.action ? req.body.action : false,
		collname = req.params.collname,
		object = req.body;

	switch (action) {
		case 'update' :
			MongoDB.connect().then(function(db) {
				db.collection(collname, function(err, collection) {
					delete object.action;	
					collection.save(object,  function (err, updated) {
						console.log(err, updated);
					})
				})
			})
			break;

		case 'searchreplace' :
			var field = req.body.field ? req.body.field : false,
				search = req.body.search ? req.body.search : false,
				replace = req.body.replace ? req.body.replace : false;
			//an error should be raised if any of the above values are false
			searchReplace(collname, field, search, replace);
			break;

		default :
			break;
	}
}

//---------------------------------------------
exports.process = function(req, res) {
	var user = req.user;
	if (!user) return res.json(401);
	var csvimport = user.csvimports.filter(function(e) {
		return e.collectionname === req.params.collname
	})[0];
	
	if (!csvimport) return res.json(404);
	var discipline = csvimport.specifycollection.discipline;
	var sortedMappings = {};

	_.each(csvimport.mapping, function(value, key) {
		if (key !== "_id") {
			if (!sortedMappings[value.tableName]) {
				sortedMappings[value.tableName] = {}
			};
			sortedMappings[value.tableName][key] = value;
		}
	});

	var promises = [];

	_.each(sortedMappings, function(value, key) {
		if (datamapper.isTree(key)) {
			var promise = datamapper.aggregateTreeAndPersist(req.params.collname, value, key, discipline);
			promises.push(promise);
		} else {
			var promise = datamapper.aggregateAndPersist(req.params.collname, value, key);
			promises.push(promise);
		}
	});

	Promise.all(promises).then(function() {
		res.send(200);
	})
	/*	
		datamapper.aggregateTreeAndPersist(req.params.collname, mappings[0], 'Taxon', discipline ).then(function(inserted){
		//	console.log(inserted);
			res.send(200, inserted);
		}).catch(function(err) {
		        throw err;
		    });	
		
	/*	
	datamapper.aggregateAndPersist(req.params.collname, mappings[1], 'Agent' ).then(function(inserted){
	//	console.log(inserted);
		res.send(200, inserted);
	}).catch(function(err) {
	        throw err;
	    });
		*/

}

exports.processtree = function(req, res) {
	var user = req.user;
	if (!user) return res.json(401);
	var csvimport = user.csvimports.filter(function(e) {
		return e.collectionname === req.params.collname
	})[0];
	console.log("csvimport : " + csvimport)
	if (!csvimport) return res.json(404);
	var discipline = csvimport.specifycollection.discipline;

	// Extract tablename from first entity in mapping
	var modelName = csvimport.mapping[Object.keys(csvimport.mapping)[0]].tableName;
	var mappings = _.omit(csvimport.mapping, function(value, key, object) {
			return key === '_id';
	});
	
	datamapper.aggregateTreeAndPersist(req.params.collname, mappings, modelName, discipline)
	.then(function() {
		csvimport.uploadedToSpecify = true;
		user.save(function(err) {
			if (err) throw err;
			return res.send(200);
		});
	})
}

exports.saveCsvMapping = function(req, res, next) {
	var user = req.user;
	if (!user) return res.json(401);
	var csvimport = user.csvimports.filter(function(e) {
		return e.collectionname === req.params.collname
	})[0];
	csvimport.mapping = req.body;
	user.save(function(err) {
		if (err) throw err;
		return res.json(201, csvimport.mapping);
	});
};

exports.deleteCsvMapping = function(req, res, next) {
	var user = req.user;
	if (!user) return res.json(401);
	var csvimport = user.csvimports.filter(function(e) {
		return e.collectionname === req.params.collname
	})[0];
	 csvimport.mapping = undefined;

	user.save(function(err) {
		if (err) throw err;
		return res.json(204);
	});
};

exports.deleteCsv = function(req, res, next) {
	var user = req.user;
	if (!user) return res.json(401);
	var csvimport = user.csvimports.filter(function(e) {
		return e.collectionname === req.params.collname
	})[0];
	
	if (!csvimport) return res.json(403);
	
  	MongoDB.connect().then(function( db) {
		return db.dropCollection(req.params.collname);
  	}).then(function( collection) {
		user.csvimports = _.without(user.csvimports, _.findWhere(user.csvimports, {collectionname: req.params.collname}));
		user.save(function(err) {
			if (err) throw err;
			return res.json(204);
		});
  	}).catch(function(err){
  		console.log(err.message);
		return res.json(500, err.message);
  	})
};


exports.saveSpecifyCollection = function(req, res, next) {
	var user = req.user;
	if (!user) return res.json(401);
	var csvimport = user.csvimports.filter(function(e) {
		return e.collectionname === req.params.collname
	})[0];
	csvimport.specifycollection = req.body;
	user.save(function(err) {
		if (err) throw err;
		return res.json(201, csvimport.specifycollection);
	});
};


// experimental
exports.processToSp = function (req, res, next){
	var user = req.user;
	if (!user) return res.json(401);
	var csvimport = user.csvimports.filter(function(e) {
		return e.collectionname === req.params.collname
	})[0];
	console.log("csvimport : " + csvimport)
	if (!csvimport) return res.json(404);
	datamapper.insertIntoSpecify(req.params.collname, csvimport).then(function(){return res.json(200); })
}

/*
	// Mappings will be posted from UI
	var mappings = [
		{
			"Kingdom": {
			fieldName: "Name",
			tableName: "Taxon",
			rankName: 	"Kingdom"
			},
			"Division": {
			fieldName: "Name",
			tableName: "Taxon",
			rankName: 	"Division"
			},
			"Class": {
			fieldName: "Name",
			tableName: "Taxon",
			rankName: 	"Class"
			},
			"Order": {
			fieldName: "Name",
			tableName: "Taxon",
			rankName: 	"Order"
			},
			"Family": {
			fieldName: "Name",
			tableName: "Taxon",
			rankName: 	"Family"
			},
			"Genus1": {
			fieldName: "Name",
			tableName: "Taxon",
			rankName: 	"Genus"
			},
			"Species1": {
			fieldName: "Name",
			tableName: "Taxon",
			rankName: 	"Species"
			},
			"Author" :{
			fieldName:"Author",
			tableName: "Taxon"
			}, 
			"Dk navn": {
			fieldName:"CommonName",
			tableName: "Taxon"
			}
		},
		{
			"State": {
			fieldName: "Name",
			tableName: "Geography",
				rankName: 	"State"
			},
			"Country": {
			fieldName: "Name",
			tableName: "Geography",
				rankName: 	"Country"
			},
			"County": {
			fieldName: "Name",
			tableName: "Geography",
				rankName: 	"Country"
			},
			"Continent": {
			fieldName: "Name",
			tableName: "Geography",
			rankName: 	"Continent"
			}
		},
		{
			"Locality Name": {
			fieldName: "LocalityName",
			tableName: "Locality"
			}
		},
		
		{	"Collector First Name1": {
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
		}}];
*/
