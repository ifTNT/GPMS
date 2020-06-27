var express = require("express");
var projectInformation = require("./EPIS/projectInformation");
var exhibitionInformation = require("./EPIS/exhibitionInformation");
const dateFormat = require("dateformat");
var router = express.Router();
var projectInformation = require("./EPIS/projectInformation");
var board = require('./ICS/board');



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

router.get("/project/:year/:nthGroup", function (req, res, next) {
  if (req.params.year === undefined || req.params.nthGroup === undefined) {
    next({
      message: "Invalid argument"
    });
  } else {
    let year = parseInt(req.params.year);
    let nthGroup = parseInt(req.params.nthGroup);
    projectInformation
      .getProject(year, nthGroup)
      .then((data) => {
        res.render('open_information', {
          imgsrc: data.img,
          title: data.topic,
          teacherName: data.teacher,
          leaderName: data.leader,
          members: data.members,
          description: data.description,
          chat: data.comment,
        });
        res.json(data);
      })
      .catch((err) => next(err));
  }
});


router.get('/board/:year/:nthGroup', function (req, res, next) {
  board
    .getBoard(req.params.year, req.params.nthGroup)
    .then((data) => {
      console.log(data)
      res.render('board',{
        stickers: data
        // stickerId: Number, // 公告的ID, integer
        // date: Date, // 公告的日期, date
        // name: String, // 公告的發布者, string
        // content: String
      });
      // res.send(JSON.stringify(data));
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;