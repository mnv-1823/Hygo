const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware for authentication
const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

// Middleware for admin authorization
const isAdmin = (req, res, next) => {
    if (req.user.UserType !== "Admin") {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};

// Register User
app.post("/register", async (req, res) => {
    try {
        const { FullName, Email, Password, UserType } = req.body;
        let user = await User.findOne({ Email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        user = new User({ FullName, Email, Password, UserType });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Users (Admin Only)
app.get("/users", authenticate, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User (Admin Only)
app.put("/users/:id", authenticate, isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete User (Admin Only)
app.delete("/users/:id", authenticate, isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
