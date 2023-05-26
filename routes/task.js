const express = require('express');
const router = express.Router();
const models = require("../models/index")
const task = require("../services/task")

// To add a new task
router.post('/newtask', async (req, res) => {
    try {
      
        const list={task:req.body.task,priority:req.body.priority};
        // console.log(list)

        const resut = await models.newTask(list);
        console.log(resut)
        res.status(resut.statusCode).send(resut.data);
    }
    catch (err) {
        console.log(err)
    }
});

// To get all tasks
router.get('/alltask', async (req, res) => {
    try {
        // const authHeader = req.headers['authorization'];
        // console.log(authHeader)
        console.log("ALL task")
        const result = await task.listTask();
        // console.log(result)
        res.status(200).send(result.data);
    }
    catch (err) {
        console.log(err)
    }
});

// To cancel a task
router.post('/canceltask', async (req, res) => {
    try {
        const result = await models.cancelTask(req.body.id);
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

// To complete a task
router.post('/completetask', async (req, res) => {
    try {
        console.log(req.body.id)
        const result = await models.completeTask(req.body.id);
        console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

// To delete a task
router.post('/deletetask', async (req, res) => {
    try {
        const result = await models.deleteTask(req.body.id);
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

// To take count of different tasks 
router.get('/count', async (req, res) => {
    try {
        let result={
            "pendingTasks":0,
            "canceledTasks":0,
            "deletedTasks":0,
            "completedTasks":0
        }
         result.pendingTasks = await models.findCount("ongoing");
         result.canceledTasks=await models.findCount("cancelled");
         result.deletedTasks=await models.findCount("deleted");
         result.completedTasks=await models.findCount("completed")
        // console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
});

// To get all cancelled tasks 
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

// To get all completed tasks 
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

// To get all ongoing tasks 
router.get('/ongoingtask', async (req, res) => {
    try {
        console.log("ongoing Task")
        const authHeader = req.headers
        console.log(authHeader)
        const result = await models.findTasks("ongoing");
        // console.log(result)
        res.status(200).send(result.data);
    }
    catch (err) {
        console.log(err)
    }
});
module.exports = router;
