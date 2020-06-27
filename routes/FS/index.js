var express = require('express');
var vote = require('./vote');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// ===================== Vote =====================
router.get('/vote/canVote', function (req, res, next) {
  vote
    .canVote(req.query.year, req.session.userId)
    .then((data) => {
      res.send(data==3?false:true);
    }).catch((err) => {
      next(err);
    })
});

router.get('/vote/isVoted', function (req, res, next) {
  vote
    .isVoted(req.query.year, req.query.nthGroup, req.session.userId)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      next(err);
    })
});

router.get('/vote/toggleVote', function (req, res, next) {
  vote
    .toggleVote(req.query.year, req.query.nthGroup, req.session.userId)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      next(err);
    })
});



module.exports = router;