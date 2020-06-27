var express = require('express');
var db = require('../../db.js');

function getBoard(year = 0, nthGroup = 0) {
    return new Promise((resolve, reject) => {
        db.Project.findOne({
            year: year,
            nthGroup: nthGroup
        }, 'board', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.board.stickers);
            }
        });
    });
}

function updateSticker(year, nthGroup, stickerId, userId, content) {
    return new Promise((resolve, reject) => {
        db.Project.findOne({
            year: year,
            nthGroup: nthGroup,
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                if (eventId == "") {
                    data.board.stickers.push({
                        stickerId: data.board.nextStickerId,
                        date: Date.now(), // 公告的日期, date
                        name: userId, // 公告的發布者, string
                        content: content
                    });
                    data.board.nextEventId = data.board.nextEventId + 1;
                } else {
                    data.board.stickers.forEach(eve => {
                        if (eve.stickerId == stickerId) {
                            date= Date.now() // 公告的日期, date
                            name= userId // 公告的發布者, string
                            content= content
                        }
                    })
                }
                data.save(function (err) {
                    if (err) reject(err)
                    else resolve(true)
                });
            }
        })
    });
}



module.exports = {
    getBoard,
    updateSticker
};