const express = require('express');
const router = express.Router()

const pythonCtrl = require("../../../modules/python/python.ctrl");


router.get("/statuscheck", pythonCtrl.statusCheck);
router.get("/createImageNasa", pythonCtrl.createImageNasa);
router.get("/getImageNasa", pythonCtrl.getImageNasa);

module.exports = router
