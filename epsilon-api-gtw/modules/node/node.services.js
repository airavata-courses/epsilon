const NODE_URL = process.env.MSVC_NODE + "/node/api/";
const PYTHON_URL = process.env.MSVC_PYTHON + "/python/api/";
const JAVA_URL = process.env.MSVC_JAVA;

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
    //Call java api, get user logs from mongo
    // let result = await axios.get(JAVA_URL+'/test/');
    return { Success: true, msg: "Got data from java" };
  } catch (err) {
    console.log(err);
    return { success: false, msg: "Server did not respond" };
  }
}

async function getBinaryFromS3(body, user) {
  try {
    let fileName = makeS3FileName(body);

    let data = await axios.post(`${NODE_URL}v1/download`, {
      fileName: fileName,
    });

    // form.append('radarfile', await fs.readFileSync('../../KIND20210530_005140_V06'));
    // let data = await unirest
    //   .post(`${NODE_URL}v1/download`)
    //   .field({ fileName: fileName });
    let pyResponse = await unirest
      .post(`${PYTHON_URL}fetchplot2/`)
      .header("Accept", "application/json")
      .attach("radarfile", "../KIND20210530_005140_V06");

    let file_name = "/" + pyResponse.body.file_name;

    const file_new = await fs.readFileSync(path.join(dirname + file_name));

    let logging_body = { user_id: user.id, request: body };
    //Call java api and send this to it
    return file_new;
  } catch (err) {
    console.log(err);
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
