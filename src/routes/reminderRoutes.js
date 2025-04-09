const express = require("express");
const router = express.Router();
const { getCurrentReminders } = require("../controllers/reminderController");

router.get("/:id/current", getCurrentReminders);

module.exports = router;
