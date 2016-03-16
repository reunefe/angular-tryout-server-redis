'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let imageLabel = request.params.imageLabel;
	let imageUrls = mongoUtil.imageUrls();

	imageUrls.createIndex({label: "text"});

	imageUrls.find({$text: {$search: imageLabel}}).limit(1).next(function (err, doc) {
		console.log(err)
		if (err || !doc) {
			response.sendStatus(400);
		} else {
			response.json(doc);
		}
	});
};