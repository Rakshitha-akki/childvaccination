const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Create a new notification
router.post("/create", notificationController.createNotification);

// Get all notifications for a specific user
router.get("/user/:userId", notificationController.getNotificationsByUser);

// Mark a notification as read
router.put("/mark-read/:id", notificationController.markAsRead);

module.exports = router;
