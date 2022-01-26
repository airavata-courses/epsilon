const express = require('express')
const app = express()

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const contentDisposition = require('content-disposition');
const dotenv = require("dotenv");

const cors = require('cors');
dotenv.config({
    path: __dirname + "/.env"
});


global.HttpStatus = require('http-status-codes');
global.dirname = __dirname;
global.app_name = "EPSILON-API-GATEWAY";


const log = require('./api/v1/common/logs/logs.v1.services')
global.globalLogger = log;

/**
 * 
 */

app.listen(port, () => console.log(`Server is listening on port ${port}!`))

/**
 * 
 */

module.exports = app;
