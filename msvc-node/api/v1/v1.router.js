const express = require("express");
const app = require("../..");
const router = express.Router();
const imageCtrl = require("../../modules/image/image.ctrl");
const os = require("os");

router.post("/download", imageCtrl.getBinaryFromS3);
router.get("/getDates/:location", imageCtrl.getDates);
router.post("/logs", imageCtrl.insertLogs);

module.exports = router;
