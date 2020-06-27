var express = require("express");
const grade = require("./grade");
var router = express.Router();

// ===================== Grade ========================

// Get grade of specificated gorup
router.get("/grade/:year/:nthGroup", function (req, res, next) {
  if (req.params.year === undefined || req.params.nthGroup === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    let nthGroup = parseInt(req.params.nthGroup);
    grade
      .getGrade(year, nthGroup)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// Set grade of specificated gorup
router.post("/grade/:year/:nthGroup", function (req, res, next) {
  if (
    req.params.year === undefined ||
    req.params.nthGroup === undefined ||
    req.body.newGrade === undefined
  ) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    let nthGroup = parseInt(req.params.nthGroup);
    let newGrade = parseInt(req.body.newGrade);
    grade
      .setGrade(req, year, nthGroup, newGrade)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
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

// ===================== Comment =====================

router.get('/comment/getComments', function (req, res, next) {
  comment
    .getComments(req.query.year, req.query.nthGroup)
    .then((data) => {
      res.send(JSON.stringify(data));
    }).catch((err) => {
      next(err);
    })
});

router.post('/comment/addComment', function (req, res, next) {
  comment
    .addComment(req.body.year, req.body.nthGroup, req.body.content, req.body.userId)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      next(err);
    })
});

module.exports = router;
