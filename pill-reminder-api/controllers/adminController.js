const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!["User", "Patient", "Auth", "Admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        await User.findByIdAndUpdate(req.params.id, { UserType: role });
        res.status(200).json({ message: "User role updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
