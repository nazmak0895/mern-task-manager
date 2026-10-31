const express = require("express");
const router = express.Router();

const upload = require("../services/upload");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  downloadTaskFile,
} = require("../controllers/taskController");

// Create a task with optional PDF
router.post("/", upload.single("linkedFile"), createTask);

// Get all tasks
router.get("/", getTasks);

// Download a task's PDF
router.get("/:id/file", downloadTaskFile);

// Get a task by ID
router.get("/:id", getTaskById);

// Update a task with optional PDF
router.put("/:id", upload.single("linkedFile"), updateTask);

// Delete a task
router.delete("/:id", deleteTask);

module.exports = router;