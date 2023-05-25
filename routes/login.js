const express = require('express');
const router = express.Router();


router.post('/login', async (req, res) => {
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