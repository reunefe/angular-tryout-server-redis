'use strict';

let mongoUtil = require("../mongo/mongoUtil");
let downloadUtil = require("../util/downloadUtil");

module.exports = function (request, response) {
	let owners = mongoUtil.owners();
	return downloadUtil(owners, mongoUtil.ownerFileDb(), response);
};