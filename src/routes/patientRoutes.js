const express = require("express");
const router = express.Router();
const {
  getTotalPatients,
  getPatients,
  togglePatientStatus,
  getPrescriptionStatus,
} = require("../controllers/patientController");

router.get("/total", getTotalPatients);
router.get("/", getPatients);
router.put("/:id/status", togglePatientStatus);
router.get("/:id/prescriptions", getPrescriptionStatus);

module.exports = router;
