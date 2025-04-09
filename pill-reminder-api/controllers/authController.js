const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
    try {
        const { FullName, Email, Password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ Email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Generate a unique UserID
        const uniqueUserID = `USER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Create new user
        user = new User({
            FullName,
            Email,
            Password: hashedPassword,
            UserID: uniqueUserID // Assign the generated UserID
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token as an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Check if user exists
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token as an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        res.json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
