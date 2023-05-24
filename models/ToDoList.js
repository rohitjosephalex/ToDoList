const mongoose = require("mongoose");

const ToDolist = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  }, priority: {
    type: Number,
    min: 1,
    max: 9,
    default: 1
  }, status: {
    type: String,
    required: true,
    default: "ongoing",

  }
},
  { collection: 'tgh' });
const ToDoList = mongoose.model("tgh", ToDolist);

module.exports = ToDoList;