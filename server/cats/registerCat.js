'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let cat = request.body;
	let part = request.files.file;

	let cats = mongoUtil.cats();
	cats.insertOne(cat, function (err, doc) {
		if (err) {
			return response.status(400).send(err);
		}

		let catId = doc.insertedId.toString();
		let readStream = mongoUtil.fs().createReadStream(part.path);
		let uploadStream = readStream.pipe(mongoUtil.files().openUploadStream(catId));
		uploadStream.on('error', function (error) {
			console.log(error);
		});
		uploadStream.on('finish', function () {
			console.log('done!');
			return response.status(200).send(doc);
		});
	});
};