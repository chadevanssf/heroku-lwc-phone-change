const { Pool } = require('pg');

//const DB_SCHEMA = process.env.HEROKU_CONNECT_SCHEMA || "salesforce";

const connectionString = process.env.DATABASE_URL;

const dbUtil = {};

const pool = new Pool({
    connectionString
});

dbUtil.query = function (text, params) {
    //console.log(text, params);
    return pool.query(text, params);
};

module.exports = dbUtil;
