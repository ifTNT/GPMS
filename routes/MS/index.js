var express = require('express');
var statisticsAnalysis = require('./statisticsAnalysis');
var router = express.Router();

router.get('/statistics/:year', function(req, res, next) {
  if (req.params.year === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    statisticsAnalysis
      .getStatistics(year)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
