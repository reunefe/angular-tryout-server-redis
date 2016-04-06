'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let ownerId = request.params.id;
	let owners = mongoUtil.owners();
	let ownerFileDb = mongoUtil.ownerFileDb();

	let deleteItem = function () {
		owners.deleteOne(
			mongoUtil.searchById(ownerId),
			function (err, results) {
				if (err) {
					return response.status(400).send(err);
				}
				return response.json(results);
			}
		);
	};

	ownerFileDb.find({filename: ownerId}).toArray(function (err, documents) {
		if (err) {
			return response.status(400).send(err);
		}
		let doc = documents[0]; // should only be one!

		if (!doc) { // none found, delete item
			return deleteItem();
		}

		ownerFileDb.delete(doc._id, function (err) { // delete image
			if (err) {
				return response.status(400).send(err);
			}
			deleteItem(); // delete item after image deletion
		});
	});
};