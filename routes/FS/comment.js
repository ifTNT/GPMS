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
                resolve(data);
            }
        });
    });
}

function addComment(year, nthGroup, content, userId) {
    return new Promise((resolve, reject) => {
        db.Project.findOneAndUpdate(
            { year: year, nthGroup: nthGroup, },
            {
              $pull: {
                comment: {
                    name: userId, // 該留言的作者名稱, string
                    content: content
                },
              },
            },
            { omitUndefined: true, new: true },
            function (err, data) {
              if (err) {
                reject(err);
              } else {
                resolve(true);
              }
            }
          );
    });
}

module.exports = {
    getComments,
    addComment
};