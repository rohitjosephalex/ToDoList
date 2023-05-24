const express = require('express');
const router = express.Router();
const models = require("../models/index")
const task = require("../services/task")

router.post('/newtask', async (req, res) => {
    try {
        // console.log(req.body)
        const resut = await models.newTask(req.body);
        // console.log(resut)
        res.status(resut.statusCode).send(resut.data);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/alltask', async (req, res) => {
    try {
        const result = await task.listTask();
        // console.log(result)
        res.status(200).send(result.data);
    }
    catch (err) {
        console.log(err)
    }
});
router.post('/canceltask', async (req, res) => {
    try {
        const result = await models.cancelTask(req.body._id);
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

router.post('/completetask', async (req, res) => {
    try {
        // console.log(req.body._id)
        const result = await models.completeTask(req.body._id);
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});
router.post('/deletetask', async (req, res) => {
    try {
        const result = await models.deleteTask(req.body._id);
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/cancelledcount', async (req, res) => {
    try {
        const result = await models.findCount("cancelled");
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/completedcount', async (req, res) => {
    try {
        const result = await models.findCount("completed");
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/deletedcount', async (req, res) => {
    try {
        const result = await models.findCount("deleted");
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});
router.get('/ongoingcount', async (req, res) => {
    try {
        const result = await models.findCount("ongoing");
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/cancelledtask', async (req, res) => {
    try {
        const result = await models.findTasks("cancelled");
        // console.log(result)
        res.status(200).send(result.data);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/completedtask', async (req, res) => {
    try {
        const result = await models.findTasks("completed");
        // console.log(result)
        res.status(200).send(result.data);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/ongoingtask', async (req, res) => {
    try {
        const result = await models.findTasks("ongoing");
        // console.log(result)
        res.status(200).send(result.data);
    }
    catch (err) {
        console.log(err)
    }
});
module.exports = router;
