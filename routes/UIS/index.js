var express = require("express");
var router = express.Router();
const userInformation = require("./userInformation");
const login = require("./login");

// Add a test user
router.get("/add_test", function (req, res, next) {
  userInformation
    .addTestUser()
    .then((userId) => {
      res.send(`New profile ${userId} saved!`);
    })
    .catch((err) => {
      next(err);
    });
});

// Find user by ID
router.get("/find/:id", function (req, res, next) {
  userInformation
    .getProfile(req.params.id)
    .then((data) => {
      res.send(JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      next(err);
    });
});

// Find user by ID and update it's content
router.get("/set/:id", function (req, res, next) {
  userInformation
    .setProfile(req.params.id, { name: "test" })
    .then((data) => {
      res.send(JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", function (req, res, next) {
  if (!("userId" in req.body) || !("password" in req.body)) {
    res.send("{'msg':'Invalid Arguments'}");
  } else {
    login
      .login(req.body.userId, req.body.password)
      .then((data) => {
        // Setup session
        req.session.logined = true;
        req.session.userId = data.userId;
        req.session.roll = data.roll;
        req.session.save(() => {
          res.json({ msg: "Login successful" });
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.get("/logout", function (req, res, netx) {
  delete req.session.logined;
  delete req.session.userId;
  delete req.session.roll;
  req.session.save(() => {
    res.json({ msg: "Logout successful" });
  });
});

module.exports = router;
