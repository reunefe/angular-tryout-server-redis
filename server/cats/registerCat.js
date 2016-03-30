'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let cat = request.body;
	let part = request.files.file;

	if(!cat || !part){
		return response.status(400).send("Something went wrong!");
	}

	let cats = mongoUtil.cats();
	cats.insertOne(cat, function (err, doc) {
		if (err) {
			return response.status(400).send(err);
		}

		let catId = doc.insertedId.toString();
		let readStream = mongoUtil.fileSystem().createReadStream(part.path);
		let uploadStream = readStream.pipe(mongoUtil.filesDb().openUploadStream(catId));
		uploadStream.on('error', function (error) {
			return response.status(400).send(err);
		});
		uploadStream.on('finish', function () {
			return response.status(200).send(doc);
		});
	});
};