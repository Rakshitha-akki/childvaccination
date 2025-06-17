const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  vid: String,
  vname: String,
  age_grp: Number,
  dose_number: String,
  description: String,
  availability: { type: Boolean, default: false }, // Now boolean
}, { collection: "vaccine" });

module.exports = mongoose.model("Vaccine", vaccineSchema, "vaccine");
