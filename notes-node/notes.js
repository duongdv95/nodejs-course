const fs = require("fs");
console.log("Starting node.js");

var addNote = (title, body) => {
    var notes = [];
    var note = {title, body};
    notes.push(note);
    var oldData = fs.readFileSync("notes-data.json");
    
    if(!oldData) {
        var notesString = JSON.stringify(notes);
    } else {
        var oldDataArray = JSON.parse(oldData);
        var combineData = oldDataArray.concat(notes);
        var notesString = JSON.stringify(combineData);
    }
    fs.writeFileSync("notes-data.json", notesString);
};

var getAll = () => {
    console.log("Getting all notes");
};

var getNote = (title) => {
    console.log("Getting note", title);
}

var removeNote = (title) => {
    console.log("Removing note", title);
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};