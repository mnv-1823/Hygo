const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); 

// Add a new patient
router.post('/patients', async (req, res) => {
    try {
        const { FullName, Email, Password, MobileNumber, Age, Gender } = req.body;
        const newPatient = new User({
            FullName,
            Email,
            Password,
            MobileNumber,
            Age,
            Gender,
            UserType: "Patient",
        });
        
        await newPatient.save();
        
        res.status(201).json({ success: true, message: 'Patient added successfully', patient: newPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding patient', error: error.message });
    }
});

module.exports = router;
