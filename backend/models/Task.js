const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["TODO", "DONE"],
    default: "TODO",
  },

  completedOn: {
  type: Date,
  default: null,
  },

  linkedFile: {
    type: Buffer,
    required: false,
  },

  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },

  deadline: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;