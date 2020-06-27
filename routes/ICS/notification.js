var express = require('express');
var db = require('../../db.js');


function getNotification(uid) {
    var profile = db.Profile.where({
        userId: uid
    });
    profile.findOne(function (err, profile) {
        if (err) return handleError(err);
        if (profile) {
            return (JSON.stringify(profile));
        }
    });
}

function sendNotification(session, targetUserId, sourceUserId, content) {
    if (session.userId == sourceUserId) {
        db.Profile.update({
            userId: targetUserId
        }, {
            $push: {
                date: Date.now(), // 通知日期, date
                content, // 通知內容, string
                read: false // 是否已讀，booleanF
              }
        }, {
            upsert : false
        }, function (err, docs) {
            if (err) return err;
            return true;
        });
    }else{
        return false
    }
}



module.exports = {
    getNotification,
    sendNotification,
};