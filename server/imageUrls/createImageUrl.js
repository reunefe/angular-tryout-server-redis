'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let imageUrl = request.body || {};

	if (!imageUrl.url || !imageUrl.label) {
		response.sendStatus(400);
		return;
	}

	if (imageUrl.maxCount <= 0) {
		delete imageUrl.maxCount;
	}

	imageUrl.path = "/generic/" + imageUrl.label.toLowerCase();
	imageUrl.editable = true;

	let imageUrls = mongoUtil.imageUrls();

	imageUrls.createIndex({label: "text"});

	imageUrls.find({$match: {$text: {$search: imageUrl.label}}}).limit(1).next(function (err, doc) {
		if (!doc) {
			imageUrls.insertOne(imageUrl, function (err, doc) {
				if (err) {
					response.sendStatus(400);
				} else {
					response.json(imageUrl);
				}
			});
		} else {
			response.sendStatus(400); // Item should not exist!
		}
	});
};