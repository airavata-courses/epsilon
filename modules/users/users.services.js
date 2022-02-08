const USERS_URL = process.env.MSVC_USERS + "/user/api";
const axios = require("axios");

exports.googleSignIn = googleSignIn;

async function googleSignIn(body) {
  try {
    let data = await axios.post(`${USERS_URL}/v1/google/signUp/`, body);
    console.log(data);
    return { data: data.data.data };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
