const express = require("express");
const router = express.Router();
const { addSchedule, getScheduleById } = require("../controllers/scheduleController");
const VaccinationSchedule = require("../models/vaccinationScheduleModel");


// ✅ FIXED PATH (no /api/schedules here)
router.get("/all", async (req, res) => {
  try {
    const schedules = await VaccinationSchedule.find()
      .populate("child_id", "name")
      .populate("vaccine_id", "vname");

    res.json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// DELETE route to remove a schedule
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await VaccinationSchedule.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//update to completed
router.put('/mark-completed/:id', async (req, res) => {
  try {
    const updated = await VaccinationSchedule.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/add-schedule", addSchedule);
router.get("/:id", getScheduleById);

module.exports = router;
