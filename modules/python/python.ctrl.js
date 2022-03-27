const pythonService = require("./python.services");
const logUtils = require("../../api/v1/utils/logger.utils");

exports.statusCheck = statusCheck;

async function statusCheck(req, res, next) {
    try {
        let result = await pythonService.statusChecker();

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