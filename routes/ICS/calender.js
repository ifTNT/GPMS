var express = require('express');
var db = require('../../db.js');


function getCalender(year = 0, nthGroup = 0) {
    return new Promise((resolve, reject) => {
        db.Project.findOne({
            year: year,
            nthGroup: nthGroup
        }, 'calender', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.events);
            }
        });
    });
}

function setCalender(year, nthGroup, eventId, date, content) {
    return new Promise((resolve, reject) => {

        var projectFind = db.Project.findOne({
            year: year,
            nthGroup: nthGroup,
        })
        var nextId = eventId;
        if (eventId == "") {
            nextId = calenderFind.calender.nextEventId;
            calenderFind.calender.nextEventId = calenderFind.calender.nextEventId + 1;
            projectFind.calender.events.push({
                eventId: nextId,
                date: date,
                content: content
            });
        }else{
            projectFind.calender.events.forEach(eve=>{
                if(eve.eventId == eventId){
                    eve.date= date,
                    eve.content= content
                }
            })
        }

        projectFind.save(function (err) {
            if (err) reject(err)
            else resolve(true)
        });
    });
}

module.exports = {
    getCalender,
    setCalender,
};