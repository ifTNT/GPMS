var express = require("express");
var exhibitionInformation = require("./exhibitionInformation");
var router = express.Router();

// Add an exhibition
router.get("/exhib/add/:year", function (req, res, next) {
  if(req.params.year===undefined){
    next({message: 'Invalid argument'});
  }else{
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
  if(req.params.year===undefined){
    next({message: 'Invalid argument'});
  }else{
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
  if(req.params.year===undefined){
    next({message: 'Invalid argument'});
  }else{
  let year = parseInt(req.params.year);
  exhibitionInformation
    .freezeExhibition(year)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
  }
});

module.exports = router;
