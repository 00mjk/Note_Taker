const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

// INIT
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// API ROUTES
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// app.use(express.status('public'));

// CALLBACK
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});