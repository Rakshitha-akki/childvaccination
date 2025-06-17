// controllers/parentController.js

const Child = require("../models/childModel");
const User = require("../models/userModel");

exports.getParentDashboard = async (req, res) => {
  try {
    const parentId = req.user.id; // assume user is authenticated and user ID is in token
    const parent = await User.findById(parentId);
    const children = await Child.find({ parent_id: parentId });

    res.status(200).json({ parent, children });
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard" });
  }
};
