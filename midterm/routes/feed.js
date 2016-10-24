var express = require('express');
var router = express.Router();

//response json
router.get('/', function (req, res) {
	res.render('live');
});

router.get('/please', function (req, res){
    res.send('SCREAMS');
})
module.exports = router;

