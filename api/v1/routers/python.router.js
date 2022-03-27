const express = require('express');
const router = express.Router()

const pythonCtrl = require("../../../modules/python/python.ctrl");


router.get("/statuscheck", pythonCtrl.statusCheck);

module.exports = router
