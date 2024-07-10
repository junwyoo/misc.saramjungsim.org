const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const {debugOut} = require('./tool');

const httpsPort = 443;

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

https.createServer({
    key: fs.readFileSync('./saramjungsim_org.key'),
    cert: fs.readFileSync('./saramjungsim_org_cert.crt')
}, app)
.listen(httpsPort);
