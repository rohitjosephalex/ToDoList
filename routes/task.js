const express = require('express');
const router = express.Router();
const models=require("../models/index")

router.get('/alltask', async (req, res) => {
    try{
        const result= await models.getAllTask();
        // console.log(result)
        res.status(200).send(result);
    }
    catch(err){
console.log(err)
    }
});

router.post('/newtask', async (req, res) => {
    try{
        // console.log(req.body)
        const resut= await models.newTask(req.body);
        // console.log(resut)
        res.status(resut.statusCode).send(resut.data);
    }
    catch(err){
console.log(err)
    }
});

module.exports = router;
