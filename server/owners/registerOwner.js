'use strict';

let redisUtil = require("../util/redisUtil");
let uuidGen = require("uuid");

module.exports = function (request, response) {
	let owner = request.body;
	let file = request.files.file;

	if (!owner) {
		return response.status(400).json({error: "Something went wrong!"});
	}


	owner._id = uuidGen.v4();

	redisUtil.insertInList("owners", owner._id, owner, true, function (err, itemId) {
		if (err) {
			return response.status(400).send(err);
		}

		if (!file || file.size === 0) {
			return response.status(200).json({itemId: itemId});
		}

		let buffer = [];
		let readStream = redisUtil.fileSystem().createReadStream(file.path);
		readStream.on('data', function (chunk) {
			buffer.push(chunk);
		});
		readStream.on('error', function (error) {
			return response.status(400).send(error);
		});
		readStream.on('end', function () {
			let newBuffer = Buffer.concat(buffer);
			redisUtil.insertInList("ownerImages", itemId, newBuffer, false, function (err, result) {
				if (err) {
					return response.status(400).send(err);
				}
				return response.status(200).json({itemId: itemId});
			});
		});
	});
};