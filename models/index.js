const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ToDoList=require("./ToDoList")


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
    try    
    {
        connect()
        const users = await ToDoList.find({});

    return(users)
}
    catch(err){
        console.log(err)
        return(err)
    }
}

const newTask=async(result)=>{  
    try {connect()
       const results= await ToDoList.create(result)
        console.log("sucess")
        return {
            statusCode: 200,
            data: results
        }
    
    } catch (error) {
        // console.log(error)
        return{
            statusCode:500,
            data:error.Error
        }
    }
}

module.exports = {getAllTask,newTask}
