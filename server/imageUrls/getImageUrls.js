'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let imageUrls = mongoUtil.imageUrls();
	imageUrls.find().toArray(function (err, docs) {
		if (err) {
			return response.status(400).send(err);
		}
		response.json(docs);
	});
};