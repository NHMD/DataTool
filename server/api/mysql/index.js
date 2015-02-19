"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
//var config    = require('../../../config/config.json')[env];

var config = require('../../config/environment');
var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
	dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
	host: config.mysql.host || "127.0.0.1",
	port: config.mysql.port || 3306, // or 5432 (for postgres)
});

var db = {};

fs
	.readdirSync(__dirname)
	.filter(function(file) {

		return fs.statSync(path.join(__dirname, file)).isDirectory();
	})

.forEach(function(dir) {

	fs
		.readdirSync(path.join(__dirname, dir)).filter(function(file) {

			if (file.indexOf(".model.js") > -1) {
				var model = sequelize.import(path.join(__dirname, dir, file));
				var capitalizedModelName = model.name.charAt(0).toUpperCase() + model.name.slice(1);
				db[capitalizedModelName] = model;
			}
		})

});



Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
