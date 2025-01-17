const db = require("../../db");
var crypto = require("crypto");
const dateFormat = require("dateformat");

// Generating user for testing
// This API is for test only
function addTestUser() {
  let userId = dateFormat(new Date(), "mmddHHMM");
  // Generate Password
  let sha1sum = crypto.createHash("sha1");
  sha1sum.update("12345");
  let password = sha1sum.digest("hex");

  return new Promise((resolve, reject) => {
    db.Profile.create({
      userId: userId,
      userPassword: password,
      avatar: "",
      name: `Test_${userId}`,
      mail: "test@mail.nuk.edu.tw",
      website: "https://csie.nuk.edu.tw",
      lab: "2066",
      roll: "member",
      groups: [],
      collections: [],
      notifications: [],
    })
      .then(() => {
        resolve(userId);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getProfile(userId = "") {
  return new Promise((resolve, reject) => {
    db.Profile.findOne({ userId: userId }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function setProfile(userId = "", newContent) {
  return new Promise((resolve, reject) => {
    db.Profile.findOneAndUpdate(
      { userId: userId },
      newContent,
      { omitUndefined: true, new: true },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

module.exports = {
  addTestUser,
  getProfile,
  setProfile,
};
