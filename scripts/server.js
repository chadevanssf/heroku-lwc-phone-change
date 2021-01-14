// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';
const API_MODE = process.env.API_MODE || 'embedded';

app.use(express.static(DIST_DIR));

if (API_MODE === 'embedded') {
    const apiManager = require('../src/server/apiManager');
    apiManager.register(app, express);
    console.log(
        `✅  Embedded Api Server registered: http://${HOST}:${PORT}` +
            apiManager.getApiRoot()
    );
}

app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
