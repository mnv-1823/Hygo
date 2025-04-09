const { Notification } = require("../models/SetTime.model");

const createNotification = async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.status(201).json({ message: "Notification created successfully", notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate("userId", "FullName Email");
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const getNotificationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).populate("userId", "FullName Email");
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification updated successfully", notification: updatedNotification });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationsByUser,
    updateNotification,
    deleteNotification
};
