const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define reusable constants
const predefinedTimings = [
    "Before Breakfast", "After Breakfast",
    "Before Lunch", "After Lunch",
    "Before Dinner", "After Dinner",
    "All Time"
];

const customTimePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

const notificationSchema = new Schema({
    medicines: [{
        medicineName: {
            type: String,
            required: [true, "Medicine name is required"],
            trim: true
        },
        take: {
            type: String,
            enum: ["Half", "Full"],
            required: [true, "Take amount is required"]
        }
    }],
    dosage: {
        type: String,
        required: [true, "Dosage is required"],
        trim: true
    },
    timing: {
        type: [String],  
        required: [true, "Timing is required"],
        validate: {
            validator: function (timings) {
                return timings.every(time => predefinedTimings.includes(time) || customTimePattern.test(time));
            },
            message: "Invalid timing format. Use predefined values or a custom time (e.g., '10:30 AM')."
        }
    },
    duration: {
        value: {
            type: Number,
            required: [true, "Duration value is required"]
        },
        unit: {
            type: String,
            enum: ["days", "weeks", "months"],
            required: [true, "Duration unit is required"]
        }
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
    },
    mobileNumber: {
        type: String,
        required: [true, "User's mobile number is required"],
        trim: true,
        minlength: [10, "Mobile number cannot be less than 10"],
        maxlength: [13, "Mobile number cannot be greater than 13"],
        match: [
            /^\+\d{1,3}\d{10}$/,
            "Please provide a valid mobile number"
        ]
    },
    DelegatedPatientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    DelegateAuthID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = { Notification, predefinedTimings, customTimePattern };
