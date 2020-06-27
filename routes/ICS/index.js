var express = require('express');
var db = require('../../db.js');
var notification = require('./notification');
var note = require('./note');
var calendar = require('./calendar');
var board = require('./board')
var router = express.Router();



router.get('/test', function (req, res) {
  res.send("test")
  // res.render('test');
});
// req.session
/* GET users listing. */


// ====================== Notification ======================
router.get('/notification/getNotification/:userId', function (req, res, next) {
  notification
    .getNotification(req.params.userId)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/notification/sendNotification', function (req, res, next) {
  notification
    .sendNotification(req.body.targetUserId, req.session.userId, req.body.content)
    .then((data) => {
      res.send(data);
    }).catch((err)=>{
      next(err);
    })
  // res.send('respond with a resource');
});

// ====================== Note ======================

router.get('/note/getNote', function (req, res, next) {
  res.render('notePage', {
    noteText: note.getNote(req.query.year, req.query.nthGroup)
      .then((data) => {
        return(data);
      }).catch((err)=>{
        next(err);
      })
  });
});

router.post('/note/updateNote', function (req, res, next) {
  console.log(req.body.year, req.body.nthGroup, req.body.noteText)
  note
    .updateNote(req.body.year, req.body.nthGroup, req.body.noteText)
    .then((data) => {
      res.send(data);
    }).catch((err)=>{
      next(err);
    })
});

// ====================== Calendar ======================

router.get('/calendar/getCalendar', function (req, res, next) {
  calendar
    .getCalendar(req.query.year, req.query.nthGroup)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/calendar/setCalendar', function (req, res, next) {
  calendar
    .setCalendar(req.body.year, req.body.nthGroup, req.body.eventId, req.body.date, req.body.content)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

// ====================== Board ======================

router.get('/board/getBoard', function (req, res, next) {
  board
    .getBoard(req.body.year, req.body.nthGroup)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/board/updateSticker', function (req, res, next) {
  board
    .updateSticker(req.body.year, req.body.nthGroup, req.body.stickerId, req.body.userId, req.body.content)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;