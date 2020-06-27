var express = require("express");
var router = express.Router();
const userInformation = require("./userInformation");

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
      next(err);
    });
});

module.exports = router;
