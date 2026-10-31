const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8082;

const DB_URI =
  process.env.MONGODB_URL || "mongodb://localhost:27017/task-manager";

const taskRoutes = require("./routes/taskRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Task routes
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB and start backend server
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB Connected!");

    app.listen(PORT, () => {
      console.log(`Backend listening on Port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log("Error in connecting DB", error);
  });