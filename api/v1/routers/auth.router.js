const express = require("express");
const router = express.Router();
const usersRouter = require("./users.router");

router.use("/ms1", usersRouter);

module.exports = router;
