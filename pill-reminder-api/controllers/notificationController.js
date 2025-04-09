const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const newNotification = new Notification({ ...req.body, userId: req.user.id });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(400).json({ message: "Invalid Data" });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
