const db = require("../../db");

// Return the Grade Array
function getGrade(year = 0, nthGroup = 0) {
  return new Promise((resolve, reject) => {
    db.Project.findOne({ year: year, nthGroup: nthGroup }, function (
      err,
      data
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(data.grade);
      }
    });
  });
}

// If current user is teacher, set grade of current user.
function setGrade(req, year = 0, nthGroup = 0, newGrade = 0) {
  return new Promise(async (resolve, reject) => {
    if (req.session.roll != "teacher") {
      reject({ message: "Permission denied" });
    } else {
      try {
        // Remove original grade if it exist
        let result = await db.Project.update(
          {
            year: year,
            nthGroup: nthGroup,
          },
          {
            $pull: {
              grade: { teacherId: req.session.userId},
            },
          }
        ).exec();
        
        // Insert new grade
        result = await db.Project.update(
          {
            year: year,
            nthGroup: nthGroup,
          },
          {
            $addToSet: {
              grade: { teacherId: req.session.userId, grade: newGrade },
            },
          }
        ).exec();

        resolve(result);
      } catch (err) {
        reject(err);
      }
    }
  });
}

module.exports = {
  getGrade,
  setGrade,
};
