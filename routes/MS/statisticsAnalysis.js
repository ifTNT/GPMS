const db = require("../../db");
const projectRanking = require("../EPIS/projectRanking");

function getStatistics(year = 0) {
  return new Promise(async (resolve, reject) => {
    let ranking = await projectRanking.getProjectRanking(year);
    let rtVal = new Array(ranking.length);
    for (const [i, value] of ranking.entries()) {
      rtVal[i] = {
        nthGroup: value.nthGroup,
        rank: i,
        ballot: value.ballot,
        comments: value.comment.length,
        browse: value.browse,
      };
    }
    resolve(rtVal);
  });
}

module.exports = {
  getStatistics,
};
