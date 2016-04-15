'use strict';

let redisUtil = require("../util/redisUtil");

module.exports = function (request, response) {
	let ownerId = request.params.id;

	redisUtil.removeFromList("ownerImages", ownerId, function (err, results) {
		if (err) {
			return response.status(400).send(err);
		}

		redisUtil.removeFromList("owners", ownerId, function (err, results) {
			if (err) {
				return response.status(400).send(err);
			}
			return response.json(results);
		});
	});
};