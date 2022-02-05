const jwt = require('jsonwebtoken');
const _ = require('lodash');


exports.verifyJWTToken = verifyJWTToken;


/*
	is authenticated function for checking request auth and returning payload i.e. the userid from system.
*/
function verifyJWTToken(req, res) {
    if (req.headers.authorization && req.headers.authorization.includes(" ")) {
        var token = req.headers.authorization.split(" ")[1];
    } else {
        var token = req.headers.authorization;
    }
    try {
        if (!token) {
            res.errorBhejdo(HttpStatus.UNAUTHORIZED, { success: false });
            return null;
        }
        let payload = jwt.verify(token, process.env.TOKEN_SECRET);
        if (payload) {
            return payload;
        }
        else {
            res.errorBhejdo(HttpStatus.UNAUTHORIZED, err);
            return null;
        }
    } catch (err) {
        globalLogger.logError(err);
        res.errorBhejdo(HttpStatus.INTERNAL_SERVER_ERROR, err);
        return null;
    }
};