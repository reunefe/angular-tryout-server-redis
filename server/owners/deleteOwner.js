'use strict';

let redisUtil = require("../util/redisUtil");

module.exports = function (request, response) {
	let ownerId = request.params.id;

	redisUtil.removeFromSet("ownerImages", ownerId, function (err, results) {
		if (err) {
			return response.status(400).send(err);
		}

		redisUtil.removeFromSet("owners", ownerId, function (err, results) {
			if (err) {
				return response.status(400).send(err);
			}
			return response.json(results);
		});
	});
};