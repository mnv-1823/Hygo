const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  medicineName: String,
  dosage: String,
  time: String,
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Reminder", reminderSchema);
