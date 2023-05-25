const express = require('express');
const router = express.Router();
const task = require('../routes/task');
const user = require('../routes/login');

router.use('/task', task);
router.use('/user', user);


module.exports = router;