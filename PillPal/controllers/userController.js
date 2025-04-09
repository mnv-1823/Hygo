const User = require("../models/UserModel");

// Create User
const createUser = async (req, res) => {
    try {
        const { FullName, Email, Password, MobileNumber } = req.body;

        if (!FullName || !Email || !Password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-Password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-Password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


module.exports = { createUser, getAllUsers, getUserById };
