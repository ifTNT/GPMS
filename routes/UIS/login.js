const db = require("../../db");
const userInformation = require("./userInformation");
var crypto = require("crypto");
const dateFormat = require("dateformat");

function login(req, userId, password) {
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
          req.session.logined = true;
          req.session.userId = data.userId;
          req.session.roll = data.roll;
          req.session.groups = data.groups;
          req.session.save(() => {
            data.messasge = "Login successfully";
           resolve(data);
          });
        } else {
          reject({ message: "Password mismatch" });
        }
      })
      .catch((err) => {
        reject({ message: err });
      });
  });
}

function logout(req){
  return new Promise((resolve, reject)=>{
  delete req.session.logined;
  delete req.session.userId;
  delete req.session.roll;
  req.session.save(() => {
    resolve()
  });
  });
}

module.exports = {
  login, logout
};
