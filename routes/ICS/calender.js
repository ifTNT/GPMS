var express = require('express');
var db = require('../../db.js');





getCalender(year = 0, nthGroup = 0)

function setCalender(year, nthGroup, eventId, date, content) {
    if (eventId == "") {
        db.Project.findOne({
            year: year,
            nthGroup: nthGroup
        }, 'calender', function (err, calender) {
            if (err) return handleError(err);

            var nextId = calender.nextEventId;
            calender.events.push({
                evnetId: nextId, // 事件ID, integer
                date: date, // 事件日期, date 
                content: content
            })
            nextId += 1;
            calender.save();
        });
    } else {
        db.Project.findOne({
            year: year,
            nthGroup: nthGroup
        }, 'calender', function (err, calender) {
            if (err) return handleError(err);
            var find = calender.events;
            find.findOne({evnetId: eventId},function(err,findEvent){
                if (err) return handleError(err);

                findEvent.date= date;
                findEvent.content= content;
                // findEvent.save();
            })
            calender.save();
        });
    }
}

module.exports = {
    getCalender,
    setCalender,
};