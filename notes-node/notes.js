const fs = require("fs");
console.log("Starting node.js");

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));  
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {title, body};
    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {

};

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNote = notes.filter((note) => note.title === title);
    return filteredNote[0];
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNote = notes.filter((note) => note.title !== title);
    saveNotes(filteredNote);
    
    return notes.length !== filteredNote.length;
}

var logNote = (note) => {
        console.log("--");
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};