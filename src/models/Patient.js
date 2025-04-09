const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  isActive: { type: Boolean, default: true },
  prescriptions: [
    {
      filename: String,
      uploadedAt: { type: Date, default: Date.now },
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
