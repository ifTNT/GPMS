var express = require("express");
const grade = require("./grade");
var router = express.Router();

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
module.exports = router;
