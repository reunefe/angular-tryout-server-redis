'use strict';

let mongoUtil = require("../mongo/mongoUtil");
let deleteUtil = require("../util/deleteUtil");

module.exports = function (request, response) {
	let catId = request.params.id;
	let cats = mongoUtil.cats();
	let catFileDb = mongoUtil.catFileDb();

	return deleteUtil(catId, cats, catFileDb, response);
};