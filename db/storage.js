const util = require('util');
const fs = require('fs');
const uuid = require('uuid');
const utils = require('util');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);
let myNotes = [];

class Storage {

    readNote() {
        fs.readFileAsync('./db.json', 'utf8');
    }

    writeNote(note) {
        return writeFileAsync('./db.json', JSON.stringify(note));
    }

    getNote() {
       return this.readNote()
        .then((notes) => {
         try {
             myNotes = [].concat(JSON.parse(notes));
         } catch (err) {
             myNotes = [];
         }
         return myNotes;
    });
  }

    addNote(note) {
       const {title, text} = note;
       const newNote = { title, text, id: uuid() };


        if( title === null || text === null) {
            throw new Error("Please enter title and text");
        }


    return this.getNote()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.writeNote(editedNote))
        .then(() => newNote);
    }

    deleteNote(id) {
    return this.getNote()
        .then((note) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.writeNote(filteredNotes))
    }
}


module.exports = new Storage;