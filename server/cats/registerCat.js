'use strict';

let mongoUtil = require("../mongo/mongoUtil");
let uploadUtil = require("../util/uploadUtil");

module.exports = function (request, response) {
	let cat = request.body;
	let part = request.files.file;

	cat.gecastreerd = cat.gecastreerd === 'true';

	return uploadUtil(cat, part, mongoUtil.cats(), mongoUtil.catFileDb(), response);
};