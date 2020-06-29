var express = require("express");
var projectInformation = require("./EPIS/projectInformation");
var exhibitionInformation = require("./EPIS/exhibitionInformation");
var userInformation = require("./UIS/userInformation");
const dateFormat = require("dateformat");
var router = express.Router();
var board = require("./ICS/board");
// var calender = require('./ICS/calendar');
var note = require("./ICS/note");
var statisticsAnalysis = require("./MS/statisticsAnalysis");
const vote = require("./FS/vote");
const session = require("express-session");

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
  res.render("home", {
    projects,
    exhibitions,
    currentExhibition,
    session: req.session,
    dateFormat,
  });
});

router.get("/login", async function (req, res, next) {
  res.render("login", {
    session: req.session,
  });
});

router.get("/project/:year/:nthGroup", async function (req, res, next) {
  if (req.params.year === undefined || req.params.nthGroup === undefined) {
    next({
      message: "Invalid argument",
    });
  } else {
    try {
      let year = parseInt(req.params.year);
      let nthGroup = parseInt(req.params.nthGroup);
      if (isNaN(year) || isNaN(nthGroup)) {
        res.send("error");
        return;
      }
      let project = await projectInformation.getProject(year, nthGroup);
      let enable_ics = false;
      if (req.session.logined === true) {
        let userInfo = await userInformation.getProfile(req.session.userId);
        for (let group of userInfo.groups) {
          if (
            group.year === project.year &&
            group.nthGroup === project.nthGroup
          ) {
            enable_ics = true;
            break;
          }
        }
      }
      let liked = false;
      if (req.session.logined === true) {
        liked = await projectInformation.isCollected(req, year, nthGroup);
      }
      let voted = false;
      if (req.session.logined === true) {
        voted = await vote.isVoted(year, nthGroup, req.session.userId);
      }
      res.render("open_information", {
        imgsrc: project.img,
        title: project.topic,
        teacherName: project.teacher,
        leaderName: project.leader,
        members: project.members,
        description: project.description,
        chat: project.comment,
        session: req.session,
        current_year: year,
        current_nthGroup: nthGroup,
        enable_ics,
        liked,
        voted
      });
    } catch (err) {
      res.redirect("/");
    }
  }
});

router.get("/board/:year/:nthGroup", function (req, res, next) {
  board
    .getBoard(req.params.year, req.params.nthGroup)
    .then((data) => {
      console.log(data);
      res.render("board", {
        stickers: data,
        nthGroup: req.params.nthGroup,
        session: req.session,
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

router.get("/user_information", async function (req, res, next) {
  if (req.session.logined === false) {
    res.redirect("/");
  } else {
    let profile;
    if (req.query.user === undefined) {
      profile = await userInformation.getProfile(req.session.userId);
    } else {
      profile = await userInformation.getProfile(req.query.user);
    }
    if (profile === null) {
      res.send("User not fount");
    } else {
      res.render("user_information", {
        session: req.session,
        profile
      });
    }
  }
});

router.get("/group_edit", async function (req, res, next) {
  if (req.session.logined === false) {
    res.redirect("/");
  } else {
    let profile = await userInformation.getProfile(req.session.userId);
    let primaryProject = profile.groups[0];
    let project = await projectInformation.getProject(
      primaryProject.year,
      primaryProject.nthGroup
    );
    res.render("group_edit", {
      session: req.session,
      project
    });
  }
});

router.get("/group_information", async function (req, res, next) {
  if (req.session.logined === false) {
    res.redirect("/");
  } else {
    let profile = await userInformation.getProfile(req.session.userId);
    let primaryProject = profile.groups[0];
    let project = await projectInformation.getProject(
      primaryProject.year,
      primaryProject.nthGroup
    );
    res.render("group_information", {
      session: req.session,
      project
    });
  }
});

router.get("/edit_board/:nthGroup/:stickerId", function (req, res, next) {
  if (req.session.logined === true) {
    res.render("edit_board", {
      userId: req.session.userId,
      year: req.session.year,
      stickerId: req.params.stickerId,
      nthGroup: req.params.nthGroup,
      session: req.session,
    });
  } else {
    res.redirect('/');
  }
});

router.get("/calendar/:year/:nthGroup", function (req, res, next) {
  res.render("calendar", {
    year: req.params.year,
    nthGroup: req.params.nthGroup,
    session: req.session,
  });
});

router.get("/note/:year/:nthGroup", function (req, res, next) {
  note
    .getNote(req.params.year, req.params.nthGroup)
    .then((data) => {
      res.render("note", {
        noteText: data,
        year: req.params.year,
        nthGroup: req.params.nthGroup,
        session: req.session,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/notice", function (req, res, next) {
  res.render("notice");
});

router.get("/statistic", function (req, res, next) {
  if (req.session.year === undefined) {
    next({
      message: "Invalid argument",
    });
  } else {
    statisticsAnalysis
      .getStatistics(req.session.year)
      .then((data) => {
        console.log(data);
        res.render("statistic", {
          results: data,
          session: req.session,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.get("/like", async function (req, res, next) {
  if (req.session.logined === true) {
    let userInfo = await userInformation.getProfile(req.session.userId);
    let collection = userInfo.collections;
    res.render("like", {
      session: req.session,
      collection
    });
  } else {
    res.redirect("/");
  }
});

router.get("/exhi_info", async function (req, res, next) {
  if (req.session.roll !== "admin") {
    res.redirect("/");
  } else {
    let year = req.session.year;
    if (req.query.year !== undefined) {
      year = parseInt(req.query.year);
      req.session.year = year;
    }
    let exhibitions = await exhibitionInformation.getExhibitions();
    let currentExhibition = await exhibitionInformation.getExhibition(year);
    await req.session.save();
    res.render("exhi_info", {
      exhibitions,
      currentExhibition,
      session: req.session,
      dateFormat,
    });
  }
});

router.get("/exhibition_edit", async function (req, res, next) {
  if (req.session.roll !== "admin") {
    res.redirect("/");
  } else {
    let year = req.session.year;
    let currentExhibition = await exhibitionInformation.getExhibition(year);
    await req.session.save();
    res.render("exhibition_edit", {
      exhi: currentExhibition,
      session: req.session,
      dateFormat,
    });
  }
});
module.exports = router;