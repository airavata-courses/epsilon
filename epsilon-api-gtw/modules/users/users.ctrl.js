const userServices = require("./users.services");

exports.googleSignIn = googleSignIn;
exports.logout = logout;

async function googleSignIn(req, res, next) {
  try {
    let user_profile = req.body.profileObj;
    console.log(user_profile);

    let response = await userServices.googleSignIn(user_profile);
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
