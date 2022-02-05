let jwt = require("jsonwebtoken");

exports.isAuthenticated = async function (req, res, next) {
  try {
    if (!req.session.user) {
      return res.errorBhejdo(HttpStatus.UNAUTHORIZED, {
        success: false,
        msg: "Could not identify user.",
      });
    }
    req.user = req.session.user;
    return next();
  } catch (err) {
    globalLogger.logError(err);
    throw err;
  }
};

exports.cookieTokenToAuth = function (req, res, next) {
  try {
    if (!req.cookies || !req.cookies.user_token) {
      return res.errorBhejdo(HttpStatus.UNAUTHORIZED, {
        success: false,
        msg: "Could not identify user.",
      });
    }
    req.headers = {};
    req.headers.authorization = req.cookies.user_token;
    return next();
  } catch (err) {
    globalLogger.logError(err);
    console.log("ERR TOKEN", err);
    throw err;
  }
};

function verifyJWTToken(authorization_token) {
  let token;
  if (authorization_token && authorization_token.includes(" ")) {
    token = authorization_token.split(" ")[1];
  } else {
    token = authorization_token;
  }
  try {
    if (!token) {
      return null;
    }
    let payload = jwt.verify(token, process.env.TOKEN_SECRET);
    if (payload) {
      return payload;
    } else {
      return null;
    }
  } catch (err) {
    globalLogger.logError(err);
    return null;
  }
}
