import React from "react";
import { Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { LoadingIndicator } from "./LoadingIndicator";
import TaskTable from "./TaskTable";
import TaskForm from "./TaskForm";

import { useTask } from "../hooks/useTask";
import { useTaskManager } from "../hooks/useTaskManager";

export const TaskManager = () => {
  // Fetch and manage task data
  const { tasks, loading, refreshTasks } = useTask();

  // Manage task operations and modal
  const {
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
  } = useTaskManager(refreshTasks);

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : tasks.length > 0 ? (
        <TaskTable
          tasks={tasks}
          onMarkAsDone={handleMarkAsDone}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <Typography variant="h4" component="h1">
            No tasks done
          </Typography>
        </Box>
      )}

      <Fab
        aria-label="add"
        color="primary"
        className="add-task-button"
        onClick={handleAdd}
      >
        <AddIcon />
      </Fab>

      <TaskForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSave}
        task={selectedTask}
        file={file}
        onFileChange={handleFileChange}
        onClearFile={handleClearFile}
      />
    </div>
  );
};