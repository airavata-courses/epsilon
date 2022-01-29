const express = require('express');
const router = express.Router()
const pythonRouter = require('./routers/python.router');
const usersRouter = require('./routers/users.router');
const nodeRouter = require('./routers/node.router');

router.use('/ms1',usersRouter);
router.use('/ms2', nodeRouter);
router.use('/ms3', pythonRouter);

module.exports = router
