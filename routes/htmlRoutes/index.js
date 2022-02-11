const path = require('path');
const router = require('express').Router();

// HTML ROUTE
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

module.exports = router;