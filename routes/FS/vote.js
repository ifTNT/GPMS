var express = require('express');
var db = require('../../db.js');


// year: Number,
// nthGroup: Number, // 第幾組(從1開始), integer
// userId: String


function canVote(year, userId) {
    return new Promise((resolve, reject) => {
        db.Vote.find({
            year: year,
            userId: userId
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.length);
            }
        });
    });
}

function isVoted(year, nthGroup, userId) {
    return new Promise((resolve, reject) => {
        db.Vote.exists({
            year: year,
            nthGroup: nthGroup,
            userId: userId
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function toggleVote(year, nthGroup, userId) {
    return new Promise((resolve, reject) => {
        isVoted(year, nthGroup, userId).then((data) => {
            if (data == true) {
                db.Vote.remove({
                    year: year,
                    nthGroup: nthGroup,
                    userId: userId
                }, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                db.Vote.create({
                    year: year,
                    nthGroup: nthGroup,
                    userId: userId
                }, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            }
        })

    });
}


module.exports = {
    canVote,
    isVoted,
    toggleVote
};