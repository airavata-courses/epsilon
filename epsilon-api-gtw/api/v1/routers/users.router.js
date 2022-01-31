const express = require("express");
const router = express.Router();

const userCtrl = require("../../../modules/users/users.ctrl");
const authUtils = require("../utils/auth.utils");

router.post("/google", userCtrl.googleSignIn);
router.get("/logout", authUtils.isAuthenticated, userCtrl.logout);

module.exports = router;
