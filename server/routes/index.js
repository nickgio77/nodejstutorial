var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page', link: '/details', nickname: 'Nick' });
});

router.get('/details', function(req, res, next) {
  res.render('details', { title: 'Details page', nickname: 'Nick', fullname: 'Nicola Giordano', interests: ['sport', 'cinema', 'drawings', 'videogames'], age:45, link:'/' });
});

module.exports = router;
