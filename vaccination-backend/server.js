require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/vaccination_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

// Routes
const userRoute = require("./routes/userRoute");
app.use("/api", userRoute);

const childRoutes = require("./routes/childRoutes");
app.use("/api/children", childRoutes);

const scheduleRoutes = require("./routes/scheduleRoutes");
app.use("/api/schedules", scheduleRoutes);

const vaccinationRoutes = require("./routes/vaccinationRoutes");
app.use("/api/vaccination", vaccinationRoutes);

const vaccineRoutes = require("./routes/vaccineRoutes");
app.use("/api/vaccines", vaccineRoutes);

const reminderRoutes = require("./routes/reminderRoutes");
app.use("/api/reminders", reminderRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port https:/localhost:${port}`);
});
