"use strict";

let redis = require("redis");
let client = redis.createClient({return_buffers: true});
let fileSystem = require('fs');

client.on("connect", function () {
	console.log("Connected to Redis");
});

module.exports = {
	fileSystem: function () {
		return fileSystem;
	},
	getList: function (list, parse, callback) {
		client.hvals(getList(list), function (err, response) {
			if (err || !parse) {
				return callback(err, response);
			}
			let result = [];
			response.forEach(function (item) {
				result.push(JSON.parse(item));
			});

			return callback(err, result);
		});
	},
	getItemFromList: function (list, key, parse, callback) {
		client.hget(getList(list), key, function (err, response) {
			callback(err, parse ? JSON.parse(response) : response);
		});
	},
	insertInSet: function (list, key, value, stringify, callback) {
		let item = stringify ? JSON.stringify(value) : value;
		client.hset(getList(list), key, item, function (err) {
			callback(err, key);
		});
	},
	removeFromSet: function (list, key, callback) {
		client.hdel(getList(list), key, function (err, response) {
			callback(err, response);
		});
	}
}
;

function getList(list) {
	return 'angular-material-server:' + list;
}