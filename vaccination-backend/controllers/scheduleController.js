const Schedule = require("../models/scheduleModel");
const Reminder = require("../models/reminderModel");
const Child = require("../models/childModel");

// ✅ Add Schedule + Create Reminder
exports.addSchedule = async (req, res) => {
  try {
    const { child_id, vaccine_id, scheduled_date } = req.body;

    if (!child_id || !vaccine_id || !scheduled_date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const child = await Child.findById(child_id);
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    const newSchedule = new Schedule({
      child_id,
      vaccine_id,
      scheduled_date,
      parent_id: child.parent_id,
      status: "Scheduled",
    });

    const savedSchedule = await newSchedule.save();

    const newReminder = new Reminder({
      parent_id: child.parent_id,
      child_id,
      vaccine_id,
      schedule_id: savedSchedule._id,
      reminder_date: scheduled_date,
      status: "Pending",
    });

    await newReminder.save();

    res.status(201).json({
      message: "Vaccination scheduled successfully",
      schedule: savedSchedule,
    });
  } catch (error) {
    console.error("❌ Error scheduling vaccination:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Schedules + Reminder Info
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("child_id")
      .populate("vaccine_id");

    const withReminders = await Promise.all(
      schedules.map(async (sch) => {
        const reminder = await Reminder.findOne({ schedule_id: sch._id });
        return { ...sch.toObject(), reminder };
      })
    );

    res.status(200).json(withReminders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

// ✅ Get Single Schedule (Optional)
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate("child_id")
      .populate("vaccine_id");

    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
