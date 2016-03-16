'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let imageUrl = request.body || {};

	if (imageUrl.maxCount <= 0) {
		delete imageUrl.maxCount;
	}

	if (!imageUrl.path || !imageUrl.url || !imageUrl.label) {
		response.sendStatus(400);
		return;
	}

	let imageUrls = mongoUtil.imageUrls();

	delete imageUrl._id; //Conflicts otherwise
	imageUrls.replaceOne(
		{label: imageUrl.label},
		imageUrl,
		function (err, results) {
			if (err) {
				response.sendStatus(400);
			} else {
				response.json(results);
			}
		});
};