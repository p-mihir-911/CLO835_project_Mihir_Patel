const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get("/", (req, res) => res.send("API is running"));

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
