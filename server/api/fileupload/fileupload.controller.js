var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');

var fs = require("fs");
var parse = require('csv').parse;
var Promise = require("bluebird");
var MongoDB = require("../../components/datamapper/nativeMongoInstance");
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
	
	var csvdelimiter = (req.body.csvdelimiter) ? req.body.csvdelimiter : ",";
	
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
		
		MongoDB.connect().then(function(db){
			var collection = db.collection(collName);
			collection.insert(rows, function(err, docs) {

				if (err) throw err;


				fs.unlink(filePath, function() {
					res.send(200, {
				  name: req.files.file.originalname,
				  collectionname: collName,
				  active: true
				});
				});

			});
		})
		.then(function(){
			req.user.csvimports.push({
				  name: req.files.file.originalname,
				  collectionname: collName,
				  active: true
				});
			req.user.save(function(err){
					if(err) throw err;
				});
			
				
			
			
		})

	}

	var columns = true;
	parseCSVFile(filePath, columns, onNewRecord, onError, done, csvdelimiter);

};

exports.find = function(req, res) {
	var limit = parseInt(req.query.limit) || 100;
	var offset = parseInt(req.query.offset) || 0;

	MongoDB.connect().then(function(db){
	
		db.collection(req.params.collname, function(err, collection) {
			
			if (err) throw err;
			collection.stats(function(err, stats) {

				res.send(200, {
					collectionname: req.params.collname,
					count: stats.count,
					size: stats.size,
					
				}
				);
				
			
			});
		});

	})
}

exports.findObject = function(req, res) {


	MongoDB.connect().then(function(db){
		
		db.collection(req.params.collname, function(err, collection) {
			
			
			collection.find({_id: MongoDB.ObjectID(req.params.id)}).toArray(function(err, docs) {
				console.log(req.params.id)
				if (err) throw err;
				res.send(200,docs[0] );
				
			});
			
		});

	})

}

exports.indexObjects = function(req, res) {
	var limit = parseInt(req.query.limit) || 100;
	var offset = parseInt(req.query.offset) || 0;

MongoDB.connect().then(function(db){
		db.collection(req.params.collname, function(err, collection) {
			
			if (err) throw err;
		
			collection.find({}).skip(offset).limit(limit).toArray(function(err, docs) {
				res.send(200, docs);
				
			});
			
		});

	})
}

exports.process = function(req, res) {

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
		var discipline = {TaxonTreeDefID : 1}; // emulating a discipline which will have Taxon and Geography tree defs
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


exports.saveCsvMapping = function(req, res, next) {
  var user = req.user;

    if (!user) return res.json(401);
	console.log("REQ :"+req.params.collname)
	var csvimport = user.csvimports.filter(function(e){ return e.collectionname === req.params.collname})[0];
	csvimport.mapping = req.body;
	console.log("USER: "+ user)
	user.save(function(err){
			if(err) throw err;
			return res.json(201, csvimport.mapping);
		});
   
 
};