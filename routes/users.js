var express = require('express');
var router = express.Router();

/* GET comicsCollection */
router.get('/comicsCollection', function(req, res) {
  var db = req.db;
  var collection = db.get('comicsCollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST a comic to the database */
router.post('/addComic', function(req, res) {
  var db = req.db;
  var collection = db.get('comicsCollection');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/* DELETE a comic from the database */
router.delete('/deleteComic/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('comicsCollection');
  var comicToDelete = req.params.id;
  collection.remove({ '_id' : comicToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;