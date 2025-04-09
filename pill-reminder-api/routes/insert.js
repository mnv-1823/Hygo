const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path as necessary

const app = express();
app.use(express.json());



// POST route to create a new user
app.post('/user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
});

// Start Server
// const PORT = process.env.PORT || 5000;
// 

module.exports = router;
