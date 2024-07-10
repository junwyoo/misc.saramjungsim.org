const express = require('express');
const cors = require('cors');
const https = require('http');
const fs = require('fs');

const {debugOut} = require('./tool');

const httpsPort = 443;
const absolutePath = 'YOUR_ABSOLUTE_PATH';

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
    debugOut('[info] New request received | ' + JSON.stringify(headers));
    res.status(200).sendFile(absolutePath + '/checkoff/index.html');
});

https.createServer({
    key: fs.readFileSync('./saramjungsim_org.key'),
    cert: fs.readFileSync('./saramjungsim_org_cert.crt')
}, app)
.listen(httpsPort);
