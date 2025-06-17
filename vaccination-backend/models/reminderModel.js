// models/reminderModel.js
const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: true,
  },
  child_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    required: true,
  },
  vaccine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaccine",
    required: true,
  },
  schedule_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  reminder_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Sent"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Reminder", reminderSchema);
