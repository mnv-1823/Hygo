const express = require("express");
const { getNotifications, createNotification, deleteNotification } = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.post("/", authMiddleware, createNotification);
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;


