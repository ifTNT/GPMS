var express = require('express');
var db = require('../../db.js');


function getCalendar(year = 0, nthGroup = 0) {
    return new Promise((resolve, reject) => {
        db.Project.findOne({
            year: year,
            nthGroup: nthGroup
        }, 'calender', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.calender);
            }
        });
    });
}

function setCalendar(year, nthGroup, eventId, date, content) {
    return new Promise((resolve, reject) => {
        db.Project.findOne({
            year: year,
            nthGroup: nthGroup,
        }, 'calender', function (err, data) {
            if (err) {
                reject(err);
            } else {
                var nextId = eventId;
                console.log(data.calender.nextEventId)
                if (eventId == "") {
                    nextId = data.calender.nextEventId;
                    data.calender.nextEventId = data.calender.nextEventId + 1;
                    data.calender.events.push({
                        eventId: nextId,
                        date: date,
                        content: content
                    });
                } else {
                    data.calender.events.forEach(eve => {
                        if (eve.eventId == eventId) {
                            eve.date = date;
                            eve.content = content;
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
    getCalendar,
    setCalendar,
};