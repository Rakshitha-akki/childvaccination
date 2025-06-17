import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Vaccine from "../models/vaccineModel.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("Connected to MongoDB");

  const rawData = fs.readFileSync("./data/vaccine.json", "utf-8");
  const vaccineData = JSON.parse(rawData);

  const cleanData = vaccineData.map(({ _id, ...rest }) => rest);

  await Vaccine.insertMany(cleanData);
  console.log("Vaccine data imported successfully");

  mongoose.disconnect();
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
