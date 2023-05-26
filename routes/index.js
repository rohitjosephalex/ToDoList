const express = require('express');
const router = express.Router();
const task = require('../routes/task');
const user = require('../routes/login');
const jwtAuth = require('../Middleware/jwt');

router.use('/task',jwtAuth.authenticateToken, task);

router.use('/user',user)




module.exports = router;
