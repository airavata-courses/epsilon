const express = require("express");
const router = express.Router();

const nodeCtrl = require("../../../modules/node/node.ctrl");

router.get("/getUserHistory", nodeCtrl.getUserHistory);
router.post("/getNewImage", nodeCtrl.getBinaryFromS3);

module.exports = router;
