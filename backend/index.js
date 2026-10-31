const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();

const PORT = 8082;
const DB_URI = "mongodb://localhost:27017/task-manager";

const taskRoutes = require("./routes/taskRoutes");

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("Error in connecting DB", error));

// Middleware
app.use(cors());
app.use(express.json());

// Task routes
app.use("/api/tasks", taskRoutes);

// Start backend server
app.listen(PORT, () => {
  console.log(`Backend listening on Port ${PORT}!`);
});

