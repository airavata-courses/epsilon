const googleServices = require("./google.services");

exports.signUp = signUp;

async function signUp(req, res, next) {
  try {
    let data = await googleServices.signUp(req.body);
    return res.bhejdo(HttpStatus.OK, { success: true, data });
  } catch (err) {
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      err: err,
    });
  }
}
