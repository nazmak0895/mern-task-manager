import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate, getStatus } from "../utils";

const TaskTable = ({
  tasks,
  onMarkAsDone,
  onDelete,
  onEdit,
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const getStatus = (deadline, status, completedOn) => {
    const now = new Date();

    // Extract the calendar date without timezone conversion
    const deadlineDay = deadline.slice(0, 10);

    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    if (status === "DONE") {
      if (!completedOn) return "Failed";

      const completionDate = new Date(completedOn);

      const completionDay = [
        completionDate.getFullYear(),
        String(completionDate.getMonth() + 1).padStart(2, "0"),
        String(completionDate.getDate()).padStart(2, "0"),
      ].join("-");

      return completionDay <= deadlineDay
        ? "Achieved"
        : "Failed";
    }

    return today > deadlineDay ? "Failed" : "In Progress";
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "22px" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Deadline</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>
                <Tooltip title={task.title}>
                  <span>{task.title}</span>
                </Tooltip>
              </TableCell>

              <TableCell>
                <Tooltip title={task.description}>
                  <span>{task.description}</span>
                </Tooltip>
              </TableCell>

              <TableCell>
                {formatDate(task.deadline)}
                <br />
                <code>{getStatus(task.deadline, task.status, task.completedOn)}</code>
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
                    component="a"
                    href={`http://localhost:8082/api/tasks/${task._id}/file`}
                    target="_blank"
                    size="small"
                  >
                    <DownloadIcon />
                  </IconButton>
                )}

                {task.status === "TODO" && (
                  <IconButton
                    onClick={() => onMarkAsDone(task._id)}
                    size="small"
                  >
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </IconButton>
                )}

                <IconButton
                  onClick={() => onEdit(task)}
                  size="small"
                >
                  <EditIcon sx={{ color: "purple" }} />
                </IconButton>

                <IconButton
                  onClick={() => onDelete(task._id)}
                  size="small"
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;