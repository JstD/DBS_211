const mysql = require('mysql');
require('dotenv').config()
'use strict'

module.exports = mysql.createConnection({
    connectionLimit :   100,
    host            :   process.env.HOST,
    user            :   process.env.ID,
    password        :   process.env.PW,
    database        :   process.env.DBS,
    timezone        :   process.env.TIMEZONE
});
