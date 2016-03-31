'use strict';

let mongoUtil = require("../mongo/mongoUtil");
let deleteUtil = require("../util/deleteUtil");

module.exports = function (request, response) {
	let ownerId = request.params.id;
	let owners = mongoUtil.owners();
	let ownerFileDb = mongoUtil.ownerFileDb();

	return deleteUtil(ownerId, owners, ownerFileDb, response);
};