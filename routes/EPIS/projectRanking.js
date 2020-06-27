const db = require("../../db");
const projectInformation = require("./projectInformation");

function getProjectBallot(year = 0, nthGroup = 0) {
  return new Promise((resolve, reject) => {
    db.Vote.countDocuments({ year: year, nthGroup: nthGroup }, function (
      err,
      count
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(count);
      }
    });
  });
}

function getProjectRanking(year = 0) {
  return new Promise(async (resolve, reject) => {
    let projects = await projectInformation.getProjects(year);
    let rtVal = new Array();
    for (let i of projects) {
      let ballot = await getProjectBallot(i.year, i.nthGroup);
      //Yucky Javascript hacking
      i = JSON.parse(JSON.stringify(i));
      i['ballot'] = ballot;
      rtVal.push(i);
    }
    // Sort by ballot
    rtVal.sort((a,b)=>{
      return b.ballot-a.ballot
    })
    resolve(rtVal);
  });
}

module.exports = {
  getProjectRanking,
};
