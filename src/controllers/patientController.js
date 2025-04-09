const Patient = require("../models/Patient");

exports.getTotalPatients = async (req, res) => {
  const count = await Patient.countDocuments();
  res.json({ totalPatients: count });
};

exports.getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

exports.togglePatientStatus = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  if (!patient) return res.status(404).json({ message: "Patient not found" });

  patient.isActive = !patient.isActive;
  await patient.save();
  res.json({ message: `Patient ${patient.isActive ? "enabled" : "disabled"}` });
};

exports.getPrescriptionStatus = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  if (!patient) return res.status(404).json({ message: "Patient not found" });

  res.json({ prescriptions: patient.prescriptions });
};
