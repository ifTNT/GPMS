const db = require("../../db");
var sha1sum = require("crypto").createHash("sha1");
const dateFormat = require("dateformat");

function addTestUser() {
  let userId = dateFormat(new Date(), "MM_dd_HH_mm");
  // Generate Password
  sha1sum.update("12345");
  let password = sha1sum.digest("hex");

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
      console.log(`New profile ${userId} saved!`);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  addTestUser,
};
