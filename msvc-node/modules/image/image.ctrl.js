const imageService = require("./image.services");

exports.getBinaryFromS3 = getBinaryFromS3;
exports.getDates = getDates;
exports.insertLogs = insertLogs;
exports.getLogs = getLogs;

async function getBinaryFromS3(req, res, next) {
  try {
    let data = await imageService.getBinaryFromS3(req.body);
    if (data.status && data.status == 400) {
      return res.bhejdo(HttpStatus.BAD_REQUEST, {
        success: false,
        msg: data.msg,
      });
    }
    return res.bhejdo(HttpStatus.OK, { success: true, file_name: data });
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

async function insertLogs(req, res, next) {
  try {
    await imageService.insertLogs(req.body);
    return res.bhejdo(HttpStatus.OK, {
      success: true,
    });
  } catch (err) {
    globalLogger.logError(err);
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      msg: err,
    });
  }
}

async function getLogs(req, res, next) {
  try {
    let history = await imageService.getLogs(req.params.user_id);
    return res.bhejdo(HttpStatus.OK, {
      success: true,
      history: history,
    });
  } catch (err) {
    globalLogger.logError(err);
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      msg: err,
    });
  }
}
