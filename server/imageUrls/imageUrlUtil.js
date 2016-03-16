'use strict';

let mongoUtil = require("../mongo/mongoUtil");

module.exports = {
	searchByLabel: function (searchLabel, foundCallback, notFoundCallback, failureCallback) {
		let imageUrls = mongoUtil.imageUrls();
		imageUrls.createIndex({label: "text"});

		let existing = [];

		// The find method will find all matching labels
		// ex. when searching for kitten, it will find kitten but kittens or somekittens as well
		imageUrls.find({$text: {$search: searchLabel}}).forEach(function (doc) {
			// This will check if the labels match completely, case-insensitive
			if (doc && doc.label.toLowerCase() == searchLabel.toLowerCase()) {
				existing.push(doc);
			}
		}, function (error) {
			if (error) {
				failureCallback(400, error);
			} else if (existing.length > 0) {
				foundCallback(existing);
			} else {
				notFoundCallback(imageUrls);
			}
		});
	},
	validateAndPrepare: function (imageUrl) {
		if (!imageUrl || !imageUrl.url || !imageUrl.label) {
			return null;
		}

		if (imageUrl.maxCount <= 0) {
			delete imageUrl.maxCount;
		}

		if (!imageUrl.hasOwnProperty('path')) {
			imageUrl.path = "/generic/" + imageUrl.label.toLowerCase();
		}

		if (!imageUrl.hasOwnProperty('editable')) {
			imageUrl.editable = true;
		}

		if (imageUrl.hasOwnProperty('_id')) {
			delete imageUrl._id; //Conflicts otherwise
		}

		return imageUrl;
	}
};