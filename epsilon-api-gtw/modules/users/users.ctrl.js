const userServices = require("./users.services");
const logUtils = require("../../api/v1/utils/logger.utils");

exports.googleSignIn = googleSignIn;
exports.logout = logout;

async function googleSignIn(req, res, next) {
  try {
    let user_profile = req.body.profileObj;
    console.log(user_profile);

    let response = await userServices.googleSignIn(user_profile);
    response.data["user_id"] = response.data.id;
    logUtils.logUserHistory(response.data, "LOGIN");
    const sess = req.session;
    sess.user = response.data;
    return res.bhejdo(HttpStatus.OK, {
      success: true,
      msg: "Login Successful",
      data: response.data,
    });
  } catch (err) {
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      err: err,
    });
  }
}

async function logout(req, res, next) {
  try {
    logUtils.logUserHistory(req.session.user, "LOGOUT");
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      return res.bhejdo(HttpStatus.OK, {
        success: true,
        msg: "User Logged Out.",
      });
    });
  } catch (err) {
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      err: err,
    });
  }
}
