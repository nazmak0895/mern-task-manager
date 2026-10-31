const TaskService = require("../services/task.service");

const TaskServiceInstance = new TaskService();

// Create a new task
const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
    };

    if (taskData.status === "DONE") {
      taskData.completedOn = new Date();
    } else if (taskData.status === "TODO") {
      taskData.completedOn = null;
    }

    if (req.file) {
      taskData.linkedFile = req.file.buffer;
    }

    const task = await TaskServiceInstance.create(taskData);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await TaskServiceInstance.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await TaskServiceInstance.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
    };

    if (taskData.status === "DONE") {
      taskData.completedOn = new Date();
    } else if (taskData.status === "TODO") {
      taskData.completedOn = null;
    }

    if (req.file) {
      taskData.linkedFile = req.file.buffer;
    }

    const task = await TaskServiceInstance.update(
      req.params.id,
      taskData
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download linked PDF
const downloadTaskFile = async (req, res) => {
  try {
    const task = await TaskServiceInstance.findById(req.params.id);

    if (!task || !task.linkedFile) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="task-${task._id}.pdf"`,
    });

    res.send(task.linkedFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await TaskServiceInstance.delete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  downloadTaskFile,
};