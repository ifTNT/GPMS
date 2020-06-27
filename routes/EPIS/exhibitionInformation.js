const db = require("../../db");

function addExhibition(year) {
  return new Promise((resolve, reject) => {
    if (year === undefined) reject({ message: "Invalid argument" });
    db.Exhibition.create(
      {
        year: year, //民國年度，integer
        date: `${year + 1911}-9-31`,
        location: "國立高雄大學圖書資訊館二樓",
        mapB64: "",
        poster: "",
        freezed: false,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

// Return all of the exhibitions
function getExhibitions() {
  return new Promise((resolve, reject) => {
    db.Exhibition.find({}, null, 
      { sort: { year: 1 } },
      (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Return spicificed year exhibition
function getExhibition(year = 0) {
  return new Promise((resolve, reject) => {
    db.Exhibition.findOne({ year: year }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Update specified year exhibition
function setExhibition(year = 0, newContent = {}) {
  return new Promise((resolve, reject) => {
    db.Exhibition.findOneAndUpdate(
      { year: year },
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

// Freeze the specified year exhibition
function freezeExhibition(year = 0) {
  return new Promise((resolve, reject) => {
    setExhibition(year, { freezed: true })
      .then((d) => {
        resolve(d);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

module.exports = {
  addExhibition,
  getExhibitions,
  getExhibition,
  setExhibition,
  freezeExhibition,
};
