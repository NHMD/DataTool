var env = process.env.NODE_ENV || "development";

var config = require('../../config/environment');

var Promise = require("bluebird");
var MongoDB = require("mongodb");
Promise.promisifyAll(MongoDB);

var DB;

exports.connect = function(){
	
	if(DB !== undefined) {
		return Promise.resolve(DB);
	}
	else {
		return MongoDB.MongoClient.connectAsync(config.mongo.uri).then(
			function(db){
				DB = db;
				return db
			}
		);
	}
	
}



