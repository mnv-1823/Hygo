const mongoose = require("mongoose");

const predefinedTimings = [
    "Before Breakfast", "After Breakfast",
    "Before Lunch", "After Lunch",
    "Before Dinner", "After Dinner",
    "All Time"
];

const notificationSchema = new mongoose.Schema({
    medicines: [{
        medicineName: { type: String, required: true, trim: true },
        take: { type: String, enum: ["Half", "Full"], required: true }
    }],
    dosage: { type: String, required: true, trim: true },
    timing: { type: [String], required: true },
    duration: {
        value: { type: Number, required: true },
        unit: { type: String, enum: ["days", "weeks", "months"], required: true }
    },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
