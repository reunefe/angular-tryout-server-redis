'use strict';

let redisUtil = require("../util/redisUtil");

module.exports = function (request, response) {
	redisUtil.getList("owners", true, function (err, list) {
		if (err) {
			return response.status(400).send(err);
		}

		if (list.length == 0) {
			return response.json([]);
		}

		let index = 0;
		let result = [];

		list.forEach(function (item) {
			index++;
			redisUtil.getItemFromList("ownerImages", item._id, false, function (err, image) {
				if (err) {
					return response.status(400).send(err);
				}
				// done
				if (image) {
					item.foto = 'data:image/jpeg;base64,' + image.toString('base64');
				}
				result.push(item);
				index--;

				if (index == 0) {
					return response.json(result);
				}
			})
		});
	});

};