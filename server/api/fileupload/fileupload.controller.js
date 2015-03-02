var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');

var fs = require("fs");
var parse = require('csv').parse;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var uploaddir = config.tempuploaddir;

var datamapper = require('../../components/datamapper');

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
	console.log(req.files);
	console.log(req.body +" ##### "+req.body.csvdelimiter);
	var csvdelimiter = (req.body.csvdelimiter) ? req.body.csvdelimiter : ",";
	console.log("delimiter "+csvdelimiter);
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
		MongoClient.connect(config.mongo.uri, function(err, db) {
			if (err) throw err;

			var collection = db.collection(collName);
			collection.insert(rows, function(err, docs) {

				if (err) throw err;


				db.close();
				fs.unlink(filePath, function() {
					res.send(200, {collection : collName});
				});

			});
		})
	}

	var columns = true;
	parseCSVFile(filePath, columns, onNewRecord, onError, done, csvdelimiter);

};

exports.find = function(req, res) {
	var limit = parseInt(req.query.limit) || 100;
	var offset = parseInt(req.query.offset) || 0;

	MongoClient.connect(config.mongo.uri, function(err, db) {
		if (err) throw err;
		db.collection(req.params.collname, function(err, collection) {
			
			if (err) throw err;
			collection.stats(function(err, stats) {

				res.send(200, {
					name: req.params.collname,
					count: stats.count,
					size: stats.size,
					
				}
				);
				db.close();
			
			});
		});

	})
}

exports.findObject = function(req, res) {


	MongoClient.connect(config.mongo.uri, function(err, db) {
		if (err) throw err;
		db.collection(req.params.collname, function(err, collection) {
			
			if (err) throw err;
			
			collection.find({_id: ObjectID(req.params.id)}).toArray(function(err, docs) {
				console.log(req.params.id)
				if (err) throw err;
				res.send(200,docs[0] );
				db.close();
			});
			
		});

	})

}

exports.indexObjects = function(req, res) {
	var limit = parseInt(req.query.limit) || 100;
	var offset = parseInt(req.query.offset) || 0;

	MongoClient.connect(config.mongo.uri, function(err, db) {
		if (err) throw err;
		db.collection(req.params.collname, function(err, collection) {
			
			if (err) throw err;
		
			collection.find({}).skip(offset).limit(limit).toArray(function(err, docs) {
				res.send(200, docs);
				db.close();
			});
			
		});

	})
}

exports.aggr = function(req, res) {
	var mappings = {	"Collector First Name1": {
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
		}};
	datamapper.aggregate(req.params.collname, mappings, 'Agent' ).then(function(inserted){
		res.send(200);
	}).catch(function(err) {
	        throw err;
	    });
	
}