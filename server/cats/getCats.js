'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let cats = mongoUtil.cats();

	let result = [];
	let index = 0;

	cats.find().forEach(function (cat) {
		index++;
		let downloadStream = mongoUtil.filesDb().openDownloadStreamByName(cat._id.toString());
		let buffer = [];
		downloadStream.on('data', function (chunk) {
			buffer.push(chunk);
		});
		downloadStream.on('error', function (error) {
			index--;

			if (index == 0) {
				response.json(result);
			}
		});
		downloadStream.on('end', function () { // done
			index--;

			let newBuffer = Buffer.concat(buffer);

			cat.foto = newBuffer.toString('base64');
			result.push(cat);

			if (index == 0) {
				response.json(result);
			}
		});
	}, function (error) {
		if (error) {
			return response.status(400).send(error);
		}
		if (index == 0) {
			return response.json([]);
		}
	});
};