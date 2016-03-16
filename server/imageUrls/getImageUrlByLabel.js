'use strict';

let imageUrlUtil = require('./imageUrlUtil');

module.exports = function (request, response) {
	let imageLabel = request.params.imageLabel;

	imageUrlUtil.searchByLabel(imageLabel, function (existing) {
		response.json(existing[0]);
	}, function (collection) {
		response.status(400).send("Label not found");
	}, function (status, error) {
		response.status(status).send(error);
	});
};