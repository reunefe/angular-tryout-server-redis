'use strict';

let express = require('express');
let router = express.Router();
let multiparty = require('connect-multiparty');
let multipartyMiddleware = multiparty();

router.route("/")
	.get(require('./getOwners'))
	.post(multipartyMiddleware, require('./registerOwner'));

router.route("/:ownerId")
	.get(require('./getOwnerById'))
	.put(multipartyMiddleware, require('./updateOwner'))
	.delete(require('./deleteOwner'));

module.exports = router;