var express = require('express');
var db = require('../../db.js');


function getNotification(uid) {
    return new Promise((resolve, reject) => {
        db.Profile.findOne({
            userId: uid
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                data.notifications.forEach(element => {
                    element.read = false
                });
                data.save(function (err) {
                    if (err) reject(err)
                    else resolve(data.notifications);
                });
            }
        });
    });
}

function sendNotification(targetUserId, sourceUserId, content) {
    return new Promise((resolve, reject) => {
        db.Profile.update({
            userId: targetUserId
        }, {
            $push: {
                date: Date.now(), // 通知日期, date
                content, // 通知內容, string
                read: false // 是否已讀，booleanF
            }
        }, {
            upsert: false
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}



module.exports = {
    getNotification,
    sendNotification,
};