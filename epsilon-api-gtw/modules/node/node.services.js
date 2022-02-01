const NODE_URL = process.env.MSVC_NODE + "/node/api/";
const PYTHON_URL = process.env.MSVC_PYTHON + "/python/api/";
const JAVA_URL = process.env.MSVC_JAVA;

const logUtils = require("../../api/v1/utils/logger.utils");

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const AWS = require("aws-sdk");
const BUCKET_NAME = "noaa-nexrad-level2";
AWS.config.update({ region: "us-east-1" });
const unirest = require("unirest");
const S3 = new AWS.S3({ apiVersion: "2006-03-01" });

exports.getUserHistory = getUserHistory;
exports.getBinaryFromS3 = getBinaryFromS3;
exports.getDates = getDates;

async function getUserHistory(user_id) {
  try {
    let data = await axios.get(`${NODE_URL}v1/logs/${user_id}`);
    return { Success: true, data: data.data.history };
  } catch (err) {
    console.log(err);
    return { success: false, msg: "Server did not respond" };
  }
}

async function getBinaryFromS3(body, user) {
  try {
    let fileName = makeS3FileName(body);
    let data;
    try {
      data = await axios.post(`${NODE_URL}v1/download`, {
        fileName: fileName,
        body,
      });
    } catch (err) {
      throw err;
    }

    body["user_id"] = user.id;
    logUtils.logUserHistory(body, "ImageRequest");

    let pyResponse = await unirest
      .post(`${PYTHON_URL}fetchplot/`)
      .header("Accept", "application/json")
      .attach("radarfile", data.data.file_name);

    let file_name = "/" + pyResponse.body.file_name;

    const file_new = await fs.readFileSync(path.join(dirname + file_name));

    //Call java api and send this to it
    return file_new;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function makeS3FileName(body) {
  return `${body.year}/${body.month}/${body.day}/${body.station}/`;
}

async function getDates(location) {
  try {
    let data = await axios.get(`${NODE_URL}v1/getDates/${location}`);

    return { Success: true, result: data.response };
  } catch (err) {
    console.log(err);
    return { success: false, msg: "Server did not respond" };
  }
}
