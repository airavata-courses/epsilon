const NODE_URL = process.env.MSVC_NODE + "/node/api/";
const axios = require("axios");

exports.logUserHistory = logUserHistory;
async function logUserHistory(body, action) {
  try {
    body["action"] = action;
    let data = await axios.post(`${NODE_URL}v1/logs`, body);
    return true;
  } catch (err) {
    console.log(err);
  }
}
