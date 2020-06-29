var express = require("express");
var db = require("../../db.js");

function getNote(year, nthGroup) {
  return new Promise((resolve, reject) => {
    db.Project.findOne(
      {
        year: year,
        nthGroup: nthGroup,
      },
      "note",
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.note.noteText);
        }
      }
    );
  });
}

function updateNote(year, nthGroup, text) {
  return new Promise((resolve, reject) => {
    // console.log(text)
    db.Project.updateOne(
      {
        year: year,
        nthGroup: nthGroup,
      },
      {
        note: {
          noteText: text,
          changeTime: Date.now(),
        },
      },
      {
        upsert: false,
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          console.log(data);
          resolve(true);
        }
      }
    );
  });
}

module.exports = {
  getNote,
  updateNote,
};
