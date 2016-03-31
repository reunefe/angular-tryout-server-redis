'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (itemId, collection, itemFileDb, response) {
	let deleteItem = function () {
		collection.deleteOne(
			mongoUtil.searchById(itemId),
			function (err, results) {
				if (err) {
					return response.status(400).send(err);
				}
				return response.json(results);
			}
		);
	};

	itemFileDb.find({filename: itemId}).toArray(function (err, documents) {
		if (err) {
			return response.status(400).send(err);
		}
		let doc = documents[0]; // should only be one!

		if (!doc) { // none found, delete item
			return deleteItem();
		}

		itemFileDb.delete(doc._id, function (err) { // delete image
			if (err) {
				return response.status(400).send(err);
			}
			deleteItem(); // delete item after image deletion
		});
	});
};