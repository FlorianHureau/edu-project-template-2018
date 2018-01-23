
const express = require('express');
const api = require('./api.js');
const config = require('./config.js');
//start a server
const app = express()

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use('/api/episodes', api)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app li'));
