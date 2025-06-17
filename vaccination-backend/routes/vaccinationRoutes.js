const express = require("express");
const router = express.Router();

const {
  addSchedule,
  getVaccinationChart,
  getVaccinationHistoryByParent,
} = require("../controllers/vaccinationController");

// Add new schedule
router.post("/add-schedule", addSchedule);

// Get chart for a specific child
router.get("/chart/:childId", getVaccinationChart);

// Get full vaccination history for a parent
router.get("/history/:parentId", getVaccinationHistoryByParent);

module.exports = router;
