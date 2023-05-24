const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ToDoList = require("./ToDoList")


const uri = `mongodb+srv://RJA:bsJY94Mn2lEBKoLt@cluster0.jfxy9ml.mongodb.net/ToDoList`;
const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log(err)
    }
}



const getAllTask = async () => {
    try {
        connect()
        const users = await ToDoList.find({status:{$ne:"deleted"}}).sort({ priority: -1, task: 1 });
        console.log(users)
        return (users)
    }
    catch (err) {
        console.log(err)
        return (err)
    }
}
// getAllTask()
const newTask = async (result) => {
    try {
        connect()
        const results = await ToDoList.create(result)
        console.log("sucess")
        return {
            statusCode: 200,
            data: results
        }

    } catch (error) {
        // console.log(error)
        return {
            statusCode: 500,
            data: error.Error
        }
    }
}

const cancelTask = async (result) => {
    try {
        connect()
        const results = await ToDoList.updateOne({_id:result},{$set:{status:"cancelled"}})
        // console.log(results)
        return {
            statusCode: 200,
            data: "sucess"
        }

    } catch (error) {
        // console.log(error)
        return {
            statusCode: 500,
            data: error.Error
        }
    }
}
// cancelTask("646d14d1db3f040dc95acfff")

const completeTask = async (result) => {
    try {
        connect()
        const results = await ToDoList.updateOne({_id:result},{$set:{status:"completed"}})
        // console.log(results)
        return {
            statusCode: 200,
            data: "sucess"
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            data: error.Error
        }
    }
}

const deleteTask = async (result) => {
    try {
        connect()
        const results = await ToDoList.updateOne({_id:result},{$set:{status:"deleted"}})
        // console.log(results)
        return {
            statusCode: 200,
            data: "sucess"
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            data: error.Error
        }
    }
}



const findCount = async (status) => {
    try {
        connect()
        const results = await ToDoList.countDocuments({status:status})
        // console.log(results)
        return {
            statusCode: 200,
            data: results
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            data: error.Error
        }
    }
}


const findTasks = async (status) => {
    try {
        connect()
        const results = await ToDoList.find({status:status}).sort({ priority: -1, task: 1 })
        // console.log(results)
        return {
            statusCode: 200,
            data: results
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            data: error.Error
        }
    }
}
// findTasks("cancelled")
module.exports = { getAllTask, newTask,cancelTask,completeTask,deleteTask,findCount,findTasks }
