const Vaccine = require("../models/vaccineModel");

exports.viewAllVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.status(200).json(vaccines);
  } catch (error) {
    console.error("Error fetching vaccines:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//vaccine update
// PUT /api/vaccines/update/:id
exports.updateVaccineAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const vaccine = await Vaccine.findById(id);
    if (!vaccine) return res.status(404).json({ error: "Vaccine not found" });

    vaccine.availability = !vaccine.availability; // Toggle boolean
    await vaccine.save();

    res.json({
      message: "Availability toggled",
      updatedAvailability: vaccine.availability ? "stock" : "out of stock"
    });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
