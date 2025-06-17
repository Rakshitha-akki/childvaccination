const Reminder = require("../models/reminderModel");

const Schedule = require("../models/vaccinationScheduleModel");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Vaccine = require("../models/vaccineModel"); // If vaccine info is stored separately



// Create a reminder
exports.createReminder = async (req, res) => {
  try {
    const { parent_id, child_id, vaccine_id, schedule_id, reminder_date } = req.body;
    const reminder = new Reminder({
      parent_id,
      child_id,
      vaccine_id,
      schedule_id,
      reminder_date,
      status: "Pending",
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

// Get all reminders
exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ reminder_date: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};





// Set up email transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.markReminderSent = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate the reminder ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid reminder ID" });
    }

    // 2. Update reminder status to "Sent"
    const reminder = await Reminder.findByIdAndUpdate(
      id,
      { status: "Sent" },
      { new: true }
    );
    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    // 3. Get the related schedule
    const schedule = await Schedule.findById(reminder.schedule_id);
    if (!schedule) {
      return res.status(404).json({ error: "Associated schedule not found" });
    }

    // 4. Get the user/parent associated with the schedule
    const user = await User.findById(schedule.parent_id);
    if (!user || !user.email) {
      return res.status(404).json({ error: "User or email not found" });
    }

    // 5. Get the vaccine name
    const vaccine = await Vaccine.findById(schedule.vaccine_id);
    const vaccineName = vaccine?.vname || vaccine?.name || "Unknown Vaccine";

    // 6. Format date
    const formattedDate = new Date(schedule.scheduled_date).toLocaleDateString();

    // 7. Set up and send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Vaccination Reminder",
      text: `Hello ${user.name},

This is a reminder for your child's upcoming vaccination.

💉 Vaccine: ${vaccineName}
📅 Scheduled Date: ${formattedDate}

Please make sure to attend on time.

Regards,
Your Healthcare Team`,
    };

    await transporter.sendMail(mailOptions);

    // 8. Respond
    res.status(200).json({
      message: "Reminder marked as sent and email sent successfully",
      reminder,
    });

  } catch (err) {
    console.error("Error in markReminderSent:", err);
    res.status(500).json({ error: "Failed to send reminder" });
  }
};

