const express = require("express");
const router = express.Router();
const Vaccine = require("../models/vaccineModel");  // not import default

const { updateVaccineAvailability } = require("../controllers/vaccineController");

// Use the controller function here:
router.put("/update/:id", updateVaccineAvailability);

// Get all vaccines
router.get("/all", async (req, res) => {
  try {
    const vaccines = await Vaccine.find({});
    res.status(200).json(vaccines);
  } catch (error) {
    console.error("Error fetching vaccines:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// // Update availability of a specific vaccine
// router.put("/update/:id", async (req, res) => {
//   const { availability } = req.body;

//   try {
//     const updatedVaccine = await Vaccine.findByIdAndUpdate(
//       req.params.id,
//       { availability },
//       { new: true }
//     );

//     if (!updatedVaccine) {
//       return res.status(404).json({ message: "Vaccine not found" });
//     }

//     res.status(200).json(updatedVaccine);
//   } catch (error) {
//     console.error("Error updating availability:", error.message);
//     res.status(500).json({ message: "Update failed", error: error.message });
//   }
// });

module.exports = router;
