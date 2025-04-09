const Reminder = require("../models/Reminder");

exports.getCurrentReminders = async (req, res) => {
  const { id } = req.params;
  const reminders = await Reminder.find({ patientId: id, active: true });
  res.json(reminders);
};
