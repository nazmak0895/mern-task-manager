import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = ({ tasks, onEdit, onDelete, onMarkDone }) => {
  const getDeadlineStatus = (task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);

    if (today <= deadline) {
      return "In Progress";
    }

    return task.status === "DONE" ? "Achieved" : "Failed";
  };

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                No tasks found!
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>

                <TableCell>{task.description}</TableCell>

                <TableCell>
                  {new Date(task.deadline).toLocaleDateString("en-GB")}
                  <br />
                  {getDeadlineStatus(task)}
                </TableCell>

                <TableCell>
                  <Chip
                    label={task.status}
                    size="small"
                    color={task.status === "DONE" ? "success" : "warning"}
                  />
                </TableCell>

                <TableCell>
                  {task.linkedFile && (
                    <IconButton
                      size="small"
                      component="a"
                      href={`http://localhost:8082/api/tasks/${task._id}/file`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DownloadIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  )}

                  {task.status !== "DONE" && (
                    <IconButton
                      size="small"
                      onClick={() => onMarkDone(task._id)}
                    >
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </IconButton>
                  )}

                  <IconButton
                    size="small"
                    onClick={() => onEdit(task)}
                  >
                    <EditIcon sx={{ color: "purple" }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => onDelete(task._id)}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;