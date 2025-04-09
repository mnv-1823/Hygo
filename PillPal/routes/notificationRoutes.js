const express = require("express");
const {
    createNotification,
    getAllNotifications,
    getNotificationsByUser,
    updateNotification,
    deleteNotification
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/", createNotification);
router.get("/", getAllNotifications);
router.get("/user/:userId", getNotificationsByUser);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
    