const db = require("../../db");
const userInformation = require("./userInformation");
var crypto = require("crypto");
const dateFormat = require("dateformat");

function login(userId, password) {
  return new Promise((resolve, reject) => {
    if (userId == undefined || password == undefined) {
      reject({ message: "Incompleted argument" });
    }
    if (userId == "" || password == "") {
      reject({ message: "Empty argument" });
    }
    userInformation
      .getProfile(userId)
      .then((data) => {
        // If user doesn't exist
        if (data === null) {
          reject({ message: "User not found" });
        }
        let sha1sum = crypto.createHash("sha1");
        sha1sum.update(password);
        let hashPassword = sha1sum.digest("hex");
        if (data.userPassword === hashPassword) {
          // Setup session
          data.messasge = "Login successfully";
          resolve(data);
        } else {
          reject({ message: "Password mismatch" });
        }
      })
      .catch((err) => {
        reject({ message: err });
      });
  });
}

module.exports = {
  login,
};
