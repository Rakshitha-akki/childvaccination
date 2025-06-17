const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  DOB: { type: Date, required: true },
  gender: { type: String, required: true },
  blood_grp: { type: String, required: true },
  weight: { type: Number, required: true },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing User model
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Child", childSchema);
