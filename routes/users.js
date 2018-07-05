var express = require('express');
var router = express.Router();

/* GET comicList */
router.get('/comicsCollection', function(req, res) {
  var db = req.db;
  var collection = db.get('comicsCollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

module.exports = router;