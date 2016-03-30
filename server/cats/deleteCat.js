'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = function (request, response) {
	let catId = request.params.id;
	let cats = mongoUtil.cats();
	let filesDb = mongoUtil.filesDb();

	filesDb.find({filename: catId}).toArray(function (err, documents) {
		if (err) {
			return response.status(400).send(err);
		}
		let doc = documents[0]; // should only be one!

		filesDb.delete(doc._id, function (err) {
			if (err) {
				return response.status(400).send(err);
			}
			cats.deleteOne(
				mongoUtil.searchById(catId),
				function (err, results) {
					if (err) {
						return response.status(400).send(err);
					}
					response.json(results);
				}
			);
		});
	});
};