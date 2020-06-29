var express = require('express');
var db = require('../../db.js');

function getComments(year, nthGroup) {
  return new Promise((resolve, reject) => {
    db.Project.find({
      year: year,
      nthGroup: nthGroup
    }, 'comment', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.comment);
      }
    });
  });
}

function addComment(year, nthGroup, content, userId) {
  return new Promise((resolve, reject) => {
    db.Project.findOne({
      year: year,
      nthGroup: nthGroup
    }, 'comment', function (err, data) {
      if (err) {
        reject(err);
      } else {
        data.comment.push({
          name: userId == "guest" ? "訪客" : userId, // 該留言的作者名稱, string
          content: content
        });
        data.save(function (err) {
          if (err) reject(err)
          else resolve(true)
        });
      }
    });
  });
}

module.exports = {
  getComments,
  addComment
};