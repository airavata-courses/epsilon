const express = require("express");
const router = express.Router();
const pythonRouter = require("./routers/python.router");
const usersRouter = require("./routers/users.router");
const nodeRouter = require("./routers/node.router");

const authUtils = require("./utils/auth.utils");

router.use("/ms2", authUtils.isAuthenticated, nodeRouter);
router.use("/ms3", authUtils.isAuthenticated, pythonRouter);

module.exports = router;
