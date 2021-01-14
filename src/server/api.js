// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;
const API_MODE = process.env.API_MODE || 'embedded';

if (API_MODE === 'separate') {
    const apiManager = require('./apiManager');
    apiManager.register(app, express);

    app.listen(PORT, () =>
        console.log(
            `✅  API Server started: http://${HOST}:${PORT}` +
                apiManager.getApiRoot()
        )
    );
}
