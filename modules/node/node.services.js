const NODE_URL = process.env.MSVC_NODE + "/node/api/";
const PYTHON_URL = process.env.MSVC_PYTHON + "/python/api/";
const JAVA_URL = process.env.MSVC_JAVA;
const { constants } = require("../../api/v1/common/constants");
const logUtils = require("../../api/v1/utils/logger.utils");

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const AWS = require("aws-sdk");
const BUCKET_NAME = "noaa-nexrad-level2";
AWS.config.update({ region: "us-east-1" });
const unirest = require("unirest");
const { RedisClient } = require("redis");
const S3 = new AWS.S3({ apiVersion: "2006-03-01" });

exports.getUserHistory = getUserHistory;
exports.getBinaryFromS3 = getBinaryFromS3;
exports.getDates = getDates;

async function getUserHistory(user_id, source) {
  try {
    let data = await axios.get(`${NODE_URL}v1/logs/${user_id}`);
    final_data = [];
    for (hist of data.data.history) {
      if (hist.value.source == source) {
        if (source == "NEXRAD") {
          hist.key = `${hist.value.station} on ${hist.value.month}/${hist.value.day}/${hist.value.year} at ${hist.value.time}`;
          final_data.push(hist);
        }
        if (source == "NASA") {
          hist.key = `Satellite Data for Start Date - End Date`;
          final_data.push(hist);
        }
      }
    }

    return { Success: true, data: final_data };
  } catch (err) {
    console.log(err);
    return { success: false, msg: "Server did not respond" };
  }
}

async function getBinaryFromS3(body, user) {
  try {
    let fileName = makeS3FileName(body);
    console.log("File Name: ", fileName);
    let redisValue = await redisNew.get(`${fileName}${body.time}`);
    console.log("redisValue ", redisValue, "for", `${fileName}${body.time}`);
    if (redisValue) {
      let file_name = "/files/" + redisValue;
      const file_new = await fs.readFileSync(path.join(dirname + file_name), {
        encoding: "base64",
      });

      return file_new;
    }
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
    body["source"] = "NEXRAD";
    logUtils.logUserHistory(body, "ImageRequest");

    let pyResponse = await unirest
      .post(`${PYTHON_URL}fetchplot/`)
      .header("Accept", "application/json")
      .attach(
        "radarfile",
        path.join(__dirname + `/../../files/${data.data.file_name}`)
      );

    let file_name = "/files/" + pyResponse.body.file_name;

    const file_new = await fs.readFileSync(path.join(dirname + file_name), {
      encoding: "base64",
    });

    await redisNew.set(
      `${fileName}${body.time}`,
      pyResponse.body.file_name,
      10 * 24 * 60 * 60
    );

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
