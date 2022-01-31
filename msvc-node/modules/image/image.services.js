const JAVA_URL = process.env.MSVC_JAVA + "/java/api";
const axios = require("axios");

const AWS = require("aws-sdk");
const BUCKET_NAME = "noaa-nexrad-level2";
AWS.config.update({ region: "us-east-1" });

let S3 = new AWS.S3({ apiVersion: "2006-03-01" });

exports.getBinaryFromS3 = getBinaryFromS3;
exports.getDates = getDates;
exports.insertLogs = insertLogs;

async function getBinaryFromS3(body) {
  try {
    const params = {
      Bucket: `${BUCKET_NAME}`,
      Delimiter: "/",
      Prefix: body.fileName,
    };

    let fileList = await S3.makeUnauthenticatedRequest(
      "listObjects",
      params
    ).promise();

    if (fileList.Contents.length == 0) {
      return { status: 400, msg: "No data available for the given date" };
    }
    const params2 = {
      Bucket: BUCKET_NAME,
      Key: fileList.Contents[0].Key,
    };

    let download = await S3.makeUnauthenticatedRequest(
      "getObject",
      params2
    ).promise();

    return download;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getDates() {
  try {
    return {
      start_date: "1991-06-05",
      end_date: new Date().toISOString().split("T")[0],
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function insertLogs(body) {
  try {
    let data = await axios.post(`${JAVA_URL}/data/add`, body);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
}
