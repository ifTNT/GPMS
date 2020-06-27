var express = require('express');
var db = require('../../db.js');
var notification = require('./notification');
var note = require('./note');
var calender = require('./calender');
var board = require('./board')
var router = express.Router();



router.get('/test', function (req, res) {
  res.send("test")
  // res.render('test');
});
// req.session
/* GET users listing. */


// ====================== Notification ======================
router.get('/notification/getNotification', function (req, res, next) {
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
    .sendNotification(req.session, req.body.targetUserId, req.body.sourceUserId, req.body.content)
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
  note
    .updateNote(req.body.year, req.body.nthGroup, req.body.noteText)
    .then((data) => {
      res.send(data);
    }).catch((err)=>{
      next(err);
    })
});

// ====================== Calender ======================

router.get('/calender/getCalender', function (req, res, next) {
  calender
    .getCalender(req.query.year, req.query.nthGroup)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/calender/setCalender', function (req, res, next) {
  calender
    .setCalender(req.body.year, req.body.nthGroup, req.body.eventId, req.body.date, req.body.content)
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