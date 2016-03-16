'use strict';

let mongoUtil = require("../mongo/mongoUtil");
let imageUrlUtil = require("./imageUrlUtil");

module.exports = function (request, response) {
	let imageUrl = imageUrlUtil.validateAndPrepare(request.body);

	if (!imageUrl) {
		return response.status(400).send("The label and url must be given!");
	}

	let imageUrls = mongoUtil.imageUrls();

	imageUrls.replaceOne(
		{label: imageUrl.label},
		imageUrl,
		function (err, results) {
			if (err) {
				return response.status(400).send(err);
			}
			response.json(results);
		}
	);
};