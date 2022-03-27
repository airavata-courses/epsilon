const PYTHON_URL = process.env.MSVC_PYTHON + "/python/api/";
const axios = require("axios");

exports.statusChecker = statusChecker;


async function statusChecker() {
    try {
        let data = await axios.get(`${PYTHON_URL}statuscheck/`);
        return { Success: true, result: data.data };
    } catch (err) {
        console.log(err);
        return { success: false, msg: "Server did not respond" };
    }
}
