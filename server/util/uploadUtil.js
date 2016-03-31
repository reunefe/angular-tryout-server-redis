'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (item, file, collection, itemFileDb, response) {
	if (!item) {
		return response.status(400).send("Something went wrong!");
	}

	collection.insertOne(item, function (err, doc) {
		if (err) {
			return response.status(400).send(err);
		}

		if (!file) {
			return response.status(200).send(doc);
		}

		let itemId = doc.insertedId.toString();
		let readStream = mongoUtil.fileSystem().createReadStream(file.path);
		let uploadStream = readStream.pipe(itemFileDb.openUploadStream(itemId));
		uploadStream.on('error', function (error) {
			return response.status(400).send(error);
		});
		uploadStream.on('finish', function () {
			return response.status(200).send(doc);
		});
	});
};