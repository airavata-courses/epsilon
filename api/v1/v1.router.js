const express = require("express");
const app = require("../..");
const router = express.Router();

const googleCtrl = require("../../modules/google/google.ctrl");

router.post("/google/signUp", googleCtrl.signUp);

module.exports = router;
