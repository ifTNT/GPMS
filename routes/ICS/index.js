var express = require('express');
var db = require('../../db.js');
var Notification = require('./notification');
var Note = require('./note');
var router = express.Router();



router.get('/test', function (req, res) {
  res.send("test")
  // res.render('test');
});
// req.session
/* GET users listing. */
router.get('/notification/getNotification', function (req, res) {
  res.send(Notification.getNotification(req.query.userId))
  // res.send(Notification.sendNotification(req.session, res.targetUserId, res.sourceUserId, res.content));
  // res.send('respond with a resource');
});

router.post('/notification/sendNotification', function (req, res) {
  // res.send(Notification.getNotification(res.userId ))
  res.send(Notification.sendNotification(req.session, req.body.targetUserId, req.body.sourceUserId, req.body.content));
  // res.send('respond with a resource');
});

router.get('/note/getNote', function (req, res) {
  res.render('index', {
    noteText: Note.getNote(req.query.year, req.query.nthGroup)
  });
});

router.post('/note/updateNote', function (req, res) {
  res.send(Note.updateNote(req.body.year, req.body.nthGroup, req.body.noteText));
});

module.exports = router;