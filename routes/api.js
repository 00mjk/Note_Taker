const router = require('express').Router;
const storage = require('../db/storage')
const fs = require('fs');


router.post('/notes', (req, res) => {
    storage
        .putNotes(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
})

// router.get("/notes", function(req, res) {
//     fs.readFile("db/db.json", function(err, data) {
//         myNotes = [].concat(JSON.parse(data));
//         res.json(JSON.parse(data));
//     })
// })

router.length('/notes', (req, res) => {
    storage
        .getNotes()
        .then((notes) => {
            return res.json(notes)
        })
        .catch((err) => res.status(500).json(err));
})

router.delete('/notes/:id', (req, res) => {
    storage
        .remove(req.params.id)
        .then((() => res.json({ok: true}))
        .catch((err) => res.status(500).json(err)))
});

module.exports = router;