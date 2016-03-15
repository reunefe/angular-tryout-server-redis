'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let imageLabel = request.params.imageLabel;
	let imageUrls = mongoUtil.imageUrls();

	imageUrls.deleteOne(
		{label: imageLabel},
		function (err, results) {
			if (err) {
				response.sendStatus(400);
			} else {
				response.json(results);
			}
		});
};