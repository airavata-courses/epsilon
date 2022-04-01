const pythonService = require("./python.services");
const logUtils = require("../../api/v1/utils/logger.utils");
const { request } = require("express");

exports.statusCheck = statusCheck;
exports.createImageNasa = createImageNasa;
exports.getImageNasa = getImageNasa;

async function statusCheck(req, res, next) {
    try {
        let result = await pythonService.statusChecker(req);

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

async function createImageNasa(req, res, next) {
    try {
        let result = await pythonService.nasaImageCreater(req);

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

async function getImageNasa(req, res, next) {
    try {
        let result = await pythonService.nasaImageGetter(req);

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
