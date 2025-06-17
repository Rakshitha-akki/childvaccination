const VaccinationSchedule = require("../models/vaccinationScheduleModel");
const Child = require("../models/childModel");
const Vaccine = require('../models/vaccineModel');

exports.addSchedule = async (req, res) => {
  try {
    const { child_id, vaccine_id, scheduled_date, parent_id } = req.body;

    const newSchedule = new VaccinationSchedule({
      child_id,
      vaccine_id,
      scheduled_date,
      parent_id,
      status: "Scheduled"
    });

    await newSchedule.save();
    res.status(201).json({ message: "Vaccination schedule added successfully", schedule: newSchedule });
  } catch (err) {
    console.error("Error adding schedule:", err);
    res.status(500).json({ message: "Failed to add schedule", error: err.message });
  }
};







exports.getVaccinationChart = async (req, res) => {
  const { childId } = req.params;

  try {
    const vaccines = await Vaccine.find().sort({ age_grp: 1 });
    const schedules = await VaccinationSchedule.find({ child_id: childId });

    const chart = vaccines.map((vaccine) => {
      const matched = schedules.find(s => s.vaccine_id.toString() === vaccine._id.toString());

      let status = "Upcoming";
      if (matched) {
        status = matched.status === "Completed" ? "Completed" : "Scheduled";
      }

      const ageInDays = vaccine.age_grp;

      // Show in days if < 30, else in months
      let dueAge;
      if (ageInDays == null) {
        dueAge = "N/A";
      } else if (ageInDays < 30) {
        dueAge = `${ageInDays} days`;
      } else {
        const ageInMonths = (ageInDays / 30.44).toFixed(1);
        dueAge = `${ageInMonths} months`;
      }

      return {
        vaccineName: vaccine.vname,
        dueAge,
        status,
      };
    });

    const child = await require("../models/childModel").findById(childId).populate("parent_id", "name");

    res.json({
      childName: child?.name || "Child",
      parentName: child?.parent_id?.name || "Parent",
      chart,
    });
  } catch (error) {
    console.error("Error generating vaccination chart:", error);
    res.status(500).json({ error: "Failed to generate chart" });
  }
};

exports.getVaccinationHistoryByParent = async (req, res) => {
  const { parentId } = req.params;

  try {
    // Get all children of the parent
    const children = await Child.find({ parent_id: parentId });

    // Get all vaccines once
    const vaccines = await Vaccine.find().sort({ age_grp: 1 });

    const history = {}; // key: childId, value: chart array

    for (const child of children) {
      // Get all scheduled/completed vaccines for this child
      const schedules = await VaccinationSchedule.find({ child_id: child._id });

      // Build the chart
      const chart = vaccines.map((vaccine) => {
        const matched = schedules.find(
          (s) => s.vaccine_id.toString() === vaccine._id.toString()
        );

        let status = "Upcoming";
        let scheduled_date = null;

        if (matched) {
          status = matched.status === "Completed" ? "Completed" : "Scheduled";
          scheduled_date = matched.scheduled_date || null;
        }

        // Convert age group from days to readable format
        const ageInDays = vaccine.age_grp;
        let dueAge;
        if (ageInDays == null) {
          dueAge = "N/A";
        } else if (ageInDays < 30) {
          dueAge = `${ageInDays} days`;
        } else {
          const ageInMonths = (ageInDays / 30.44).toFixed(1);
          dueAge = `${ageInMonths} months`;
        }

        return {
          vaccineName: vaccine.vname,
          dueAge,
          status,
          scheduled_date,
        };
      });

      history[child._id] = chart;
    }

    res.json({ history }); // ← now returns an object with childId keys
  } catch (error) {
    console.error("Error fetching vaccination history:", error);
    res.status(500).json({ error: "Failed to fetch vaccination history" });
  }
};
