"use strict";

let fileSystem = require('fs');
let mongo = require("mongodb");
let client = mongo.MongoClient;
let filesDb;
let _db;

module.exports = {
	connect: function () {
		client.connect("mongodb://localhost:27017/angular-material-tryout", (err, db) => {
			if (err) {
				console.log(err);
				console.log("Error connecting to Mongo - check mongod connection");
				process.exit(1);
			}
			_db = db;
			filesDb = new mongo.GridFSBucket(db);
			console.log("Connected to Mongo");
		});
	},
	fileSystem: function () {
		return fileSystem;
	},
	filesDb: function () {
		return filesDb;
	},
	searchById: function (id) {
		return {_id: new mongo.ObjectID(id)};
	},
	cats: function () {
		return _db.collection("cats");
	}
};