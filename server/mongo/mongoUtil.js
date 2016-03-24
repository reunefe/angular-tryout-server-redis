"use strict";

let fs = require('fs');
let mongo = require("mongodb");
let client = mongo.MongoClient;
let files;
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
			files = new mongo.GridFSBucket(db);
			console.log("Connected to Mongo");
		});
	},
	fs: function () {
		return fs;
	},
	files: function () {
		return files;
	},
	cats: function () {
		return _db.collection("cats");
	}
};