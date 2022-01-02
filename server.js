const express = require("express");
const uuid = require("uuid").v4;
const path = require("path");
const logger = require("morgan");
const fs = require("fs");
var myNotes = [];

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger("dev"));

// API ROUTES
app.get("/api/notes", function(req, res) {
  fs.readFile("db/db.json", "utf8", function(err, data) {
    myNotes = [].concat(JSON.parse(data));
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function(req, res) {
  const newNote = { id: uuid(), ...req.body };
  myNotes.push(newNote);
  fs.writeFile("db/db.json", JSON.stringify(myNotes), function(err, data) {
    console.log(err, data);
    res.send(newNote);
  });
});

app.delete("/api/notes/:id", function(req, res) {
  var note = myNotes.find(i => i.id === req.params.id);
  if (!note) return res.send("note not found");
  var index = myNotes.indexOf(note);
  myNotes.splice(index, 1);
  fs.writeFile("db/db.json", JSON.stringify(myNotes), function(err, data) {
    console.log(err, data);
    res.send(true);
  });
});

// HTML ROUTES
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// CALLBACK
app.listen(PORT, () => {
    console.log("success");
})