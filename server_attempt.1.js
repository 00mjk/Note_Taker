// IMPORT
const express = require('express');
const path = require('path');
const api = require('./routes/api');
const html = require('./routes/html');

// INIT
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', html);
app.use('/api', api);

// CALLBACK
app.listen(PORT, () => {
    console.log('success!')
})