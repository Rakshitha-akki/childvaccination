const Child = require("../models/childModel");

// Add Child
const addChild = async (req, res) => {
  try {
    console.log("📥 Request body received:", req.body);

    const { name, DOB, gender, blood_grp, weight, parent_id } = req.body;

    if (!name || !DOB || !gender || !blood_grp || !weight || !parent_id) {
      console.log("❌ Missing field:", { name, DOB, gender, blood_grp, weight, parent_id });
      return res.status(400).json({ message: "All fields are required" });
    }

    const child = new Child({
      name,
      DOB,
      gender,
      blood_grp,
      weight,
      parent_id
    });

    const savedChild = await child.save();
    console.log("✅ Child saved to DB:", savedChild);

    res.status(201).json({ message: "Child added successfully", child: savedChild });
  } catch (error) {
    console.error("❌ Error saving child:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// View All Children
const viewAllChildren = async (req, res) => {
  try {
    const children = await Child.find().populate("parent_id", "name email");
    res.status(200).json(children);
  } catch (error) {
    console.error("Error fetching children:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// View Children (simplified)
const viewChildren = async (req, res) => {
  try {
    const children = await Child.find().populate("parent_id", "name");
    res.status(200).json(children);
  } catch (err) {
    console.error("Error fetching children:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get children by parent ID
const getChildrenByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;
    const children = await Child.find({ parent_id: parentId });
    res.status(200).json(children);
  } catch (error) {
    console.error("Error fetching children by parent ID:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Export all functions
module.exports = {
  addChild,
  viewAllChildren,
  viewChildren,
  getChildrenByParentId
};
