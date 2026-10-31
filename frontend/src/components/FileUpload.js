import React from "react";
import { Button, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

const FileUpload = ({ file, onFileChange, onClearFile }) => {
  return (
    <>
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFileIcon />}
        sx={{ mt: 2 }}
      >
        {file ? file.name : "UPLOAD PDF"}

        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={onFileChange}
        />
      </Button>

      {file && (
        <IconButton
          onClick={onClearFile}
          sx={{ paddingTop: 1 }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      )}
    </>
  );
};

export default FileUpload;