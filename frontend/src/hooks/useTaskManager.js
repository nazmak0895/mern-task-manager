import { useState } from "react";
import {
  createTask,
  updateTask,
  deleteTask,
} from "../services";

export const useTaskManager = (refreshTasks) => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [file, setFile] = useState(null);

  // Open Add Task modal
  const handleAdd = () => {
    setSelectedTask(null);
    setFile(null);
    setOpen(true);
  };

  // Open Edit Task modal
  const handleEdit = (task) => {
    setSelectedTask(task);
    setFile(null);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
    setFile(null);
  };

  // Handle PDF selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0] || null);
  };

  // Remove selected PDF
  const handleClearFile = () => {
    setFile(null);
  };

  // Create or update task
  const handleSave = async (formData) => {
    try {
      if (file) {
        formData.append("linkedFile", file);
      }

      if (selectedTask) {
        await updateTask(selectedTask._id, formData);
      } else {
        await createTask(formData);
      }

      handleClose();
      await refreshTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Mark task as done
  const handleMarkAsDone = async (taskId) => {
    try {
      const formData = new FormData();
      formData.append("status", "DONE");

      await updateTask(taskId, formData);
      await refreshTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        await refreshTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return {
    open,
    selectedTask,
    file,
    handleAdd,
    handleEdit,
    handleClose,
    handleFileChange,
    handleClearFile,
    handleSave,
    handleMarkAsDone,
    handleDelete,
  };
};