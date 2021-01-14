const apiPhoneChange = require('./apiPhoneChange');

const validUrlEndpoints = [
    {
        urlName: 'phonechange',
        module: apiPhoneChange
    }
];

const API_URL_ROOT = process.env.API_URL_ROOT || '/api';

const apiManager = {};

apiManager.getApiRoot = function () {
    return API_URL_ROOT;
};

apiManager.register = function (expressApp, express) {
    const endPoints = validUrlEndpoints.map((element) => element.urlName);

    expressApp.get(API_URL_ROOT, (req, res) => {
        res.json({ success: true, endpoints: endPoints });
    });

    validUrlEndpoints.forEach((element) => {
        element.module.registerMethods(
            expressApp,
            express,
            API_URL_ROOT,
            element.urlName
        );
    });
};

module.exports = apiManager;
