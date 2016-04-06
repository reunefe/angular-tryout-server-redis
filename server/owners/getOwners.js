'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let owners = mongoUtil.owners();
	let fileDb = mongoUtil.ownerFileDb();
	let result = [];
	let index = 0;

	owners.find().forEach(function (item) {
		index++;
		let downloadStream = fileDb.openDownloadStreamByName(item._id.toString());
		let buffer = [];
		downloadStream.on('data', function (chunk) {
			buffer.push(chunk);
		});
		downloadStream.on('error', function (error) {
			result.push(item);
			index--;
			if (index == 0) {
				return response.json(result);
			}
		});
		downloadStream.on('end', function () { // done
			let newBuffer = Buffer.concat(buffer);
			item.foto = 'data:image/jpeg;base64,' + newBuffer.toString('base64');
			result.push(item);
			index--;
			if (index == 0) {
				return response.json(result);
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