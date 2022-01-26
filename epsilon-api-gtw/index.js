const express = require("express");
const app = express();

var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const contentDisposition = require("content-disposition");
const dotenv = require("dotenv");

const cors = require("cors");
dotenv.config({
  path: __dirname + "/.env",
});

global.HttpStatus = require("http-status-codes");
global.dirname = __dirname;
global.app_name = "EPSILON-API-GATEWAY";

const log = require("./api/v1/common/logs/logs.v1.services");
global.globalLogger = log;

const port = process.env.PORT || 3003;

app.use("*", log.logRequest);

let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (process.env.WHITELIST.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true,
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false,
    }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use("*", (req, res, next) => {
  res.set({
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "X-DNS-Prefetch-Control": "off",
    maxAge: process.env.MAX_AGE,
    includeSubDomains: true,
    preload: true,
    preflightContinue: false,
    "Access-Control-Allow-Origin": process.env.WHITELIST,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, sentry-trace",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  });

  const result = /^(http(s)?(:\/\/))?((.*)\.)?leadschool\.in(\/.*)?$/.test(
    req.headers.referer
  );

  if (
    req.headers.source === "webapp" &&
    !result &&
    (process.env.SERVER_SETUP === "production" ||
      process.env.SERVER_SETUP === "staging")
  ) {
    const msg =
      "<h1>SECURITY ALERT!!</h1><p>Looks like you are using the erp from an unauthorized website. Please follow the steps below.</p><ol><li>Type erp.leadschool.in in your browser.</li><li>Immediately change your password.</li><li>Report this at excellence@leadschool.in immediately</li></ol><h1>SECURITY ALERT!!</h1>";
    log.warn({
      warning: msg,
      referer: req.headers.referer,
    });
    return res.errorBhejdo(HttpStatus.NOT_FOUND, {
      success: false,
      msg: msg,
    });
  } else {
    for (let q in req.query) {
      req.query[q] = decodeURIComponent(req.query[q]);
    }
    for (let q in req.params) {
      req.params[q] = decodeURIComponent(req.params[q]);
    }

    cors(corsOptionsDelegate)(req, res, next);
  }
});

app.use(cookieParser());

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: false,
  })
);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));

/**
 *
 */

module.exports = app;
