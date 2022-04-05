const nodeService = require("./node.services");
const { constants } = require("../../api/v1/common/constants");
exports.getUserHistory = getUserHistory;
exports.getBinaryFromS3 = getBinaryFromS3;
exports.getDate = getDate;

async function getUserHistory(req, res, next) {
  try {
    let user_id = req.user.id;
    let history = await nodeService.getUserHistory(
      user_id,
      req.params.source || "NEXRAD"
    );
    // console.log("HISTORY,", history.data);

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
    if (!req.body.station in constants.station_names) {
      return res.bhejdo(HttpStatus.BAD_REQUEST, {
        success: false,
        msg: "Station name is not valid. Please select from the map or enter correct Station name.",
      });
    }
    let data = await nodeService.getBinaryFromS3(req.body, req.user);
    // res.set({ "Content-Type": "image/png" });
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
