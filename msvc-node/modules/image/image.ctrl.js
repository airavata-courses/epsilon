const imageService = require("./image.services");

exports.getBinaryFromS3 = getBinaryFromS3;
exports.getDates = getDates;

async function getBinaryFromS3(req, res, next) {
  try {
    let data = await imageService.getBinaryFromS3(req.body);
    if (data.status && data.status == 400) {
      return res.bhejdo(HttpStatus.BAD_REQUEST, {
        success: false,
        msg: data.msg,
      });
    }
    return res.bufferBhejdo(data.Body, "new");
  } catch (err) {
    globalLogger.logError(err);
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      msg: err,
    });
  }
}

async function getDates(req, res, next) {
  try {
    let data = await imageService.getDates();
    return res.bhejdo(HttpStatus.OK, { success: true, data: data });
  } catch (err) {
    globalLogger.logError(err);
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      msg: err,
    });
  }
}
