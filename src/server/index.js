const express = require('express');
const api = require('./api.js');
const config = require('./config.js');
const app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api/episodes', api)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));