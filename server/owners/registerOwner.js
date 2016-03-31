'use strict';

let mongoUtil = require("../mongo/mongoUtil");
let uploadUtil = require("../util/uploadUtil");

module.exports = function (request, response) {
	let owner = request.body;
	let part = request.files.file;

	return uploadUtil(owner, part, mongoUtil.owners(), mongoUtil.ownerFileDb(), response);
};