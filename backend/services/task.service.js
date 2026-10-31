const Task = require("../models/Task");

class TaskService {
  find = async () => {
    return await Task.find({});
  };

  create = async (body) => {
    const task = new Task(body);
    return await task.save();
  };

  update = async (id, body) => {
    return await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
  };

  delete = async (id) => {
    return await Task.findByIdAndDelete(id);
  };

    findById = async (id) => {
    return await Task.findById(id);
  };

  findByIdAndDelete = async (id) => {
    return await Task.findByIdAndDelete(id);
  };
}

module.exports = TaskService;