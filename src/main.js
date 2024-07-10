const express = require('express');
const cors = require('cors');
const https = require('http');
const fs = require('fs');

const {debugOut} = require('./tool');

const httpsPort = 8443;
const absolutePath = '/Users/Yoo/codes/www/misc.saramjungsim.org';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));

// Health check
app.get('/', (req, res) => {
    res.status(200).send('health check')
});

// Check off
app.get('/checkoff', (req, res) => {
    const {body, headers} = req;
    debugOut('[info] [Check Off] New request received | ' + JSON.stringify(headers));

    app.use('/checkoff', express.static('checkoff'));
    res.status(200).sendFile(absolutePath + '/checkoff/index.html');
});

// Game
app.get('/game', (req, res) => {
    const {body, headers} = req;
    debugOut('[info] [Game] New request received | ' + JSON.stringify(headers));

    app.use('/game', express.static('game'));
    res.status(200).sendFile(absolutePath + '/game');
});

https.createServer({
    key: fs.readFileSync('./saramjungsim_org.key'),
    cert: fs.readFileSync('./saramjungsim_org_cert.crt')
}, app)
.listen(httpsPort);
