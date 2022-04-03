const PYTHON_URL = process.env.MSVC_PYTHON + "/python/api/";
const axios = require("axios");
const kafka = require("../../api/v1/utils/kafka.utils");
const fs = require("fs");
const path = require("path");
const logUtils = require("../../api/v1/utils/logger.utils");

exports.statusChecker = statusChecker;
exports.nasaImageCreater = nasaImageCreater;
exports.nasaImageGetter = nasaImageGetter;

async function statusChecker(req) {
  try {
    kafka.run("statuscheckpython", JSON.stringify(req.body));
    let data = await axios.get(`${PYTHON_URL}statuscheck/`);
    return { Success: true, result: data.data };
  } catch (err) {
    console.log(err);
    return { success: false, msg: "Server did not respond" };
  }
}

async function nasaImageCreater(req) {
  try {
    let requestData = req.body;
    let UID = Date.now();
    requestData["UID"] = UID;
    kafka.run("getnasaimage", JSON.stringify(requestData));
    redisValue = { Status: "Pushed to Message Queue", FilePath: "" };

    await redisNew.set(
      UID.toString(),
      JSON.stringify(redisValue),
      10 * 24 * 60 * 60
    );

    // body["user_id"] = req.user.id;
    // body["source"] = "NASA";
    // logUtils.logUserHistory(body, "ImageRequest");

    return { Success: true, UniqueID: UID };
  } catch (err) {
    console.log(err);
    return { success: false, msg: "Server did not respond" };
  }
}

async function nasaImageGetter(req) {
  try {
    let redisKey = req.body.UID;
    let redisValue = await redisNew.get(redisKey.toString());
    let redisValueJson = JSON.parse(redisValue);
    let action;
    let file = "";

    if (redisValue) {
      if (
        redisValueJson["Status"] == "Pushed to Message Queue" ||
        redisValueJson["Status"] == "Working on Image Creation"
      ) {
        action = "Wait";
      } else if (redisValueJson["Status"] == "Error in Image Creation") {
        action = "Error";
        return { Success: false, Action: action, File: file };
      } else if (redisValueJson["Status"] == "Image Created Successfully") {
        action = "Display";
        // let file_name = "/files/" + redisValueJson['FilePath'];
        // const file_new = await fs.readFileSync(path.join(dirname + file_name), {
        //     encoding: "base64",
        //   });

        //   file = file_new;

        let file_name = redisValueJson["FilePath"];
        console.log(file_name);
        const file_new = await fs.readFileSync(file_name, {
          encoding: "base64",
        });

        file = file_new;
      }
    }
    return { Success: true, Action: action, File: file };
  } catch (err) {
    console.log(err);
    return { success: false, msg: "Server did not respond" };
  }
}
