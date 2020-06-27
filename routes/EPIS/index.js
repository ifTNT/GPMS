var express = require("express");
var exhibitionInformation = require("./exhibitionInformation");
var projectInformation = require("./projectInformation");
var router = express.Router();

// Add an exhibition
router.get("/exhib/add/:year", function (req, res, next) {
  if (req.params.year === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    exhibitionInformation
      .addExhibition(year)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// Get all of the exhibitions
router.get("/exhibs", function (req, res, next) {
  exhibitionInformation
    .getExhibitions()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

// Get an exhibition
router.get("/exhib/:year", function (req, res, next) {
  if (req.params.year === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    exhibitionInformation
      .getExhibition(year)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// Freeze an exhibition
router.get("/exhib/:year/freeze", function (req, res, next) {
  if (req.params.year === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    exhibitionInformation
      .freezeExhibition(year)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// ================= Begin Project ===================

// Add a project
router.get("/proj/add/:year/:nthGroup", function (req, res, next) {
  if (req.params.year === undefined || req.params.nthGroup === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    let nthGroup = parseInt(req.params.nthGroup);
    projectInformation
      .addProject(year, nthGroup)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// Get all of the project of one year
router.get("/projs/:year", function (req, res, next) {
  if (req.params.year === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    projectInformation
      .getProjects(year)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// Get a project
router.get("/proj/:year/:nthGroup", function (req, res, next) {
  if (req.params.year === undefined || req.params.nthGroup === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    let nthGroup = parseInt(req.params.nthGroup);
    projectInformation
      .getProject(year, nthGroup)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// Get whether a group is collected
router.get("/proj/:year/:nthGroup/is_collected", function (req, res, next) {
  if (req.params.year === undefined || req.params.nthGroup === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    let nthGroup = parseInt(req.params.nthGroup);
    projectInformation
      .isCollected(req, year, nthGroup)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

// Toggle group collection with current user
router.get("/proj/:year/:nthGroup/toggle_collect", function (req, res, next) {
  if (req.params.year === undefined || req.params.nthGroup === undefined) {
    next({ message: "Invalid argument" });
  } else {
    let year = parseInt(req.params.year);
    let nthGroup = parseInt(req.params.nthGroup);
    projectInformation
      .toggleCollect(req, year, nthGroup)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
