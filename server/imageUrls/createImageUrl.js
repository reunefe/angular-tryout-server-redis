'use strict';

let imageUrlUtil = require('./imageUrlUtil');

module.exports = function (request, response) {
	let imageUrl = imageUrlUtil.validateAndPrepare(request.body);

	if (!imageUrl) {
		return response.status(400).send("The label and url must be given!");
	}

	imageUrlUtil.searchByLabel(imageUrl.label, function (existing) {
		return response.status(409).send("Label already exists!");
	}, function (collection) {
		collection.insertOne(imageUrl, function (err, doc) {
			if (err) {
				return response.status(400).send(err);
			}
			response.json(imageUrl);
		});
	}, function (status, error) {
		return response.status(status).send(error);
	});
};