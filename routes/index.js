var express = require("express");
var projectInformation = require("./EPIS/projectInformation");
var exhibitionInformation = require("./EPIS/exhibitionInformation");
const dateFormat = require("dateformat");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  let year = req.session.year;
  if (req.query.year !== undefined) {
    year = parseInt(req.query.year);
    req.session.year = year;
  }
  let projects = await projectInformation.getProjects(year);
  let exhibitions = await exhibitionInformation.getExhibitions();
  let currentExhibition = await exhibitionInformation.getExhibition(year);
  await req.session.save();
  console.log(req.session);
  res.render("home", {
    projects,
    exhibitions,
    currentExhibition,
    session: req.session,
    dateFormat
  });
});

router.get("/login", async function (req, res, next) {
  res.render("login", { session: req.session });
});

router.get("/open_information", async function (req, res, next) {
  res.render("open_information", { session: req.session });
});

module.exports = router;
