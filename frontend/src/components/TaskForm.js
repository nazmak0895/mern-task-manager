import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import FileUpload from "./FileUpload";

const TaskForm = ({
  open,
  onClose,
  onSubmit,
  task,
  file,
  onFileChange,
  onClearFile,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(task?.title || "");
      setDescription(task?.description || "");
      setDeadline(task?.deadline?.slice(0, 10) || "");
    }
  }, [open, task]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline);

    if (task?.status) {
      formData.append("status", task.status);
    }

    onSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "465px",
          maxWidth: "calc(100% - 32px)",
          borderRadius: 0,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 4, pt: 4, pb: 2 }}>
          <TextField
            label="Title"
            fullWidth
            required
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            required
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Deadline"
            type="date"
            fullWidth
            required
            margin="dense"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <FileUpload
            file={file}
            onFileChange={onFileChange}
            onClearFile={onClearFile}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 4,
            pb: 3,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Button onClick={onClose}>CANCEL</Button>

          <Button type="submit" variant="contained">
            {task ? "UPDATE" : "SAVE"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;