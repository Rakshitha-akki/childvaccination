const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");

// Create a new reminder
router.post("/create", reminderController.createReminder);

// Get all reminders
router.get("/all", reminderController.getAllReminders);

// Mark a reminder as sent

router.post("/markReminderSent/:id", reminderController.markReminderSent);
module.exports = router;
