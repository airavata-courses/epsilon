const nodeService = require("./node.services");

exports.getUserHistory = getUserHistory;
exports.getBinaryFromS3 = getBinaryFromS3;
exports.getDate = getDate;

async function getUserHistory(req, res, next) {
  try {
    let user_id = req.user.id;
    let history = await nodeService.getUserHistory(user_id);

    return res.bhejdo(HttpStatus.OK, { data: history.data });
  } catch (err) {
    globalLogger.logError(err);
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      data: err,
    });
  }
}

async function getBinaryFromS3(req, res, next) {
  try {
    let data = await nodeService.getBinaryFromS3(req.body, req.user);
    res.set({ "Content-Type": "image/png" });
    res.bufferBhejdo(data, "new.png");
  } catch (err) {
    globalLogger.logError(err);
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      msg: err,
    });
  }
}

async function getDate(req, res, next) {
  try {
    let location = req.params.location;

    let result = nodeService.getDates(location);

    return res.bhejdo(HttpStatus.OK, { data: result });
  } catch (err) {
    globalLogger.logError(err);
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      data: err,
    });
  }
}
