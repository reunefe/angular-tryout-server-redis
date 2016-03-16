'use strict';

let express = require('express');
let router = express.Router();
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

router.route("/")
	.get(require('./getImageUrls'))
	.post(jsonParser, require('./createImageUrl'));

router.route("/:imageLabel")
	.get(require('./getImageUrlByLabel'))
	.put(jsonParser, require('./updateImageUrl'))
	.delete(jsonParser, require('./deleteImageUrl'));

module.exports = router;