const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
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
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduled_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed"],
    default: "Scheduled",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("VaccinationSchedule", scheduleSchema);
