'use strict'

let express = require('express');
let router = express.Router();
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

router.route("/")
	.get(require('./GetImageUrls'))
	.post(jsonParser, require('./CreateImageUrl'));

router.route("/:imageLabel")
	.get(require('./GetImageUrlByLabel'))
	.put(jsonParser, require('./UpdateImageUrl'))
	.delete(jsonParser, require('./DeleteImageUrl'));

module.exports = router;