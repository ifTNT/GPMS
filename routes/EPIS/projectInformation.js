const db = require("../../db");

function addProject(year = 0, nthGroup = 0) {
  return new Promise((resolve, reject) => {
    if (year === undefined || nthGroup === undefined)
      reject({ message: "Invalid argument" });
    db.Project.create(
      {
        year: year,
        nthGroup: nthGroup, // 第幾組(從1開始), integer
        topic: `${year}-${nthGroup}`, // 專題題目, string
        description: ".", // 簡介, string
        tag: [], // 標籤, 長度可以是0到3個, array of string
        teacher: "", // 老師 ID, Profile
        leader: "", // 組長 ID, Profile
        member: [],
        grade: 0, // 評分, 1~5,若為0則表示尚未評分 integer
        browse: 0, // 瀏覽次數，嚴格遞增
        comments: [],
        board: {
          // JSON
          nextStickerId: 1, //下一張公告的ID，嚴格遞增
          stickers: [],
        },
        calender: {
          // JSON
          nextEventId: 1, // 下一個事件的 ID, 嚴格遞增
          events: [],
        },
        note: {
          // JSON
          noteText: "",
          changeTime: "2020-01-01", // 修改時間
        },
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
function getProjects(year = 0) {
  return new Promise((resolve, reject) => {
    db.Project.find({ year: year }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Return spicificed year exhibition
function getProject(year = 0, nthGroup = 0) {
  return new Promise((resolve, reject) => {
    db.Project.findOne({ year: year, nthGroup: nthGroup }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Update specified year exhibition
function setPorject(req, year = 0, nthGroup = 0, newContent = {}) {
  return new Promise((resolve, reject) => {
    db.Project.findOneAndUpdate(
      { year: year, nthGroup: nthGroup },
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

function isCollected(req, year = 0, nthGroup = 0) {
  return new Promise((resolve, reject) => {
    if (req.session.logined === false) {
      reject({ message: "Not loged in" });
    } else {
      db.Profile.findOne(
        {
          userId: req.session.userId,
          "collections.year": year,
          "collections.nthGroup": nthGroup,
        },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data != null);
          }
        }
      );
    }
  });
}

function toggleCollect(req, year = 0, nthGroup = 0) {
  return new Promise(async (resolve, reject) => {
    let collected = await isCollected(req, year, nthGroup).catch((err) => {
      resolve(err);
    });
    if (collected) {
      // Remove project from collection
      db.Profile.findOneAndUpdate(
        { userId: req.session.userId },
        {
          $pull: {
            collections: {
              year: year,
              nthGroup: nthGroup,
            },
          },
        },
        { omitUndefined: true, new: true },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(!collected);
          }
        }
      );
    } else {
      // Push new project to collection
      let newCollection = await getProject(year, nthGroup).catch((err) => {
        reject(err);
      });
      db.Profile.findOneAndUpdate(
        { userId: req.session.userId },
        { $push: { collections: newCollection } },
        { omitUndefined: true, new: true },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(!collected);
          }
        }
      );
    }
  });
}

module.exports = {
  addProject,
  getProjects,
  getProject,
  setPorject,
  isCollected,
  toggleCollect,
};
