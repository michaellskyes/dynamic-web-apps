var express = require('express');
var router = express.Router();

//response json
router.get('/', function (req, res) {
	res.render('live');
});


module.exports = router;