var express = require('express');
var db = require('../../db.js');






function getNote(year, nthGroup) {
    db.Project.findOne({
        userId: year,
        nthGroup: nthGroup
    }, 'note', function (err, text) {
        if (err) return handleError(err);
        return text.noteText
    });
}

function updateNote(year, nthGroup, text) {
    db.Project.update({
        userId: year,
        nthGroup: nthGroup
    }, {
        note: {noteText: text,changeTime: Date.now()}
    }, {
        upsert : false
    }, function (err, docs) {
        if (err) return err;
        return true;
    })
}



module.exports = {
    getNote,
    updateNote,
};