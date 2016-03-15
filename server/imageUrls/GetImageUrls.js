'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let imageUrls = mongoUtil.imageUrls();
	imageUrls.find().toArray(function(err, docs) {
		if (err) {
			response.sendStatus(400);
		}
		response.json(docs);
	});
};