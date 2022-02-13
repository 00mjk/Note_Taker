const express = require("express");
const path = require('path');
const fs = require("fs");
const {
    v4: uuidv4
} = require('uuid');

// INIT
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("./app/public/"));

// API ROUTES
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);
// app.use(express.status('public'));

// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');


//GET REQUEST METHOD 2
app.get("/api/notes", function (req, res) {
    let notesDB = fs.readFileSync('./app/data/db/db.json');
    let notesData = JSON.parse(notesDB);
    // console.log(notesData);
    res.json(notesData);
});

// let git = Request:
//GET REQUEST METHOD 2
app.get("./public/notes.html", function (req, res) {
    let notesDB = fs.readFileSync('./app/data/db/db.json');
    let notesData = JSON.parse(notesDB);
    // console.log(notesData);
    res.json(notesData)
});


//insert my new note into my "database" array
// notesData.push(newNote)

//START POST GET REQUEST METHOD 2
app.post("/api/notes", function (req, res) {
    //Access the POSTed data in `req.body`
    let newNote = req.body;
    console.log(newNote);
    //Use the fs module to read the file
    let notesDB = fs.readFileSync('./app/data/db/db.json');
    //THEN parse the file contents with JSON.parse() to the real data
    let notesData = JSON.parse(notesDB);

    //add a unique id to the newNote
    let idVariable = uuidv4();
    newNote["id"] = idVariable;
    console.log(newNote);

    //insert my new note into my "database" array
    notesData.push(newNote);
    //now i need to re-save the updated `notesData` with my `newNote` to my db.json
    //this json is a constructor function, its just in all caps
    fs.writeFile("./app/data/db/db.json", JSON.stringify(notesData), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File written successfully\n");
            //this json is related to express somehow
            res.json(notesData);
        }
    });
    return;
});


//DELETE request
app.delete("/api/notes/:id", function (req, res) {
    // console.log(req.params.id)
    let notesDB = fs.readFileSync('./app/data/db/db.json');
    console.log("notesDB: " + notesDB)
    let notesData = JSON.parse(notesDB);
    console.log("notesData: " + notesData)

    let noteID = req.params.id;
    notesData = notesData.filter(
        // element => element.id !==noteID
        //DECONSTRUCT METHOD
        ({
            id
        }) => id !== noteID

    )
    console.log(notesData)
    fs.writeFile("./app/data/db/db.json", JSON.stringify(notesData), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("File written successfully\n");
            //this json is related to express somehow
            res.json(notesData);
        }
    });
    return;
    }
);




// RETURN the contents at `notes.html `
const notes = app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/notes.html"));
});
// PATH to index.html 
app.get("*", function (req, res) {
    //sending a get request to my server to get something at '/'. And i send back an html file
    // RETURN the contents at `index.html`
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
    //
});


// CALLBACK
app.listen(PORT, function () {
    console.log("App listeningon on " + `PORT ` + `${PORT}`);
});