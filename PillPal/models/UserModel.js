const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new mongoose.Schema({
    profilePhoto: {
        type: String
    },
    FullName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        match: [
            /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
            "please provide valid First Name"
        ],
        maxlength: [40, "First name length should be less than 40 characters."]
    },
    Email: {
        type: String,
        unique: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email"],
    },
    UserID: {
        type: String,
        unique: true,
        trim: true,
    },
    Password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password should be at least 8 characters long."],
    },
    MobileNumber: [
        {
            number: {
                type: String,
                required: [true, "User's mobile number is required"],
                trim: true,
                minlength: [10, "Mobile number cannot be less than 10"],
                maxlength: [13, "Mobile number cannot be greater than 13"],
                match: [
                    /^\+\d{1,3}\d{10}$/,
                    "Please provide a valid mobile number",
                ],
            },
            isVerified: {
                type: Boolean,
                default: false,
            },
        },
    ],
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
    },
    Age: {
        type: Number,
        max: [60, "Maximum age cannot exceed 60"],
    },
    DateOfBirth: {
        type: Date,
    },
    Country: {
        type: String,
        trim: true,
    },
    State: {
        type: String,
        trim: true,
    },
    City: {
        type: String,
        trim: true,
    },
    UserType: {
        type: String,
        enum: ["User", "Patient", "Auth","Admin"],
        default: "User",
    },
    Folders: [
        {
            folderName: {
                type: String,
                required: [true, "Folder name is required"],
                trim: true,
            },
            folderAccess: [{
                DelegateFolderAuthID: {
                     type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                
                },
                AccessFolderID:{
                    type: [String],
                    enum: ["Insert", "Update", "Delete", "View"]
                },
            }
            ],   
            files: [
                {
                    fileName: {
                        type: String,
                        required: [true, "File name is required"],
                        trim: true,
                    },
                    fileType: {
                        type: String,
                        enum: ["jpg", "jpeg", "png", "pdf"], 
                        required: [true, "File type is required"],
                    },
                    filePath:{
                        type: String
                    },
                    fileAccess:[ 
                        {
                    DelegateFolderAuthID:{
                        type: String,
                        enum: ["Insert", "Update", "Delete", "View"]
                    },
                    AccessfileID:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    }}],
                    uploadedAt: {
                        type: Date,
                        default: Date.now,
                    }
                    
                },
            ],
        },
    ],
    DelegatedPatientID: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            accessAccount: {
                type: [String],
                enum: ["Insert", "Update", "Delete", "View"]
            }
        }
    ],
    DelegateAuthID: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            accessAccount: {
                type:  [String],
                enum: ["Insert", "Update", "Delete", "View"]
            }
        }
    ]
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;