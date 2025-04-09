const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
    profilePhoto: {
        type: String,
    },
    FullName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true,
        match: [
            /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
            "Please provide a valid Full Name",
        ],
        maxlength: [40, "Full Name length should be less than 40 characters."],
    },
    Email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        match: [
            /^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format",
        ],
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
                required: [true, "Mobile number is required"],
                trim: true,
                minlength: [10, "Mobile number cannot be less than 10 digits"],
                maxlength: [15, "Mobile number cannot be greater than 15 digits"],
                match: [
                    /^\+?\d{10,15}$/,
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
        ref: "User",
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
        enum: ["User", "Patient", "Auth", "Admin"],
        default: "User",
    },
    Folders: [
        {
            folderName: {
                type: String,
                required: [true, "Folder name is required"],
                trim: true,
            },
            folderAccess: [
                {
                    DelegateFolderAuthID: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                    AccessFolderID: {
                        type: [String],
                        enum: ["Insert", "Update", "Delete", "View"],
                    },
                },
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
                    filePath: {
                        type: String,
                    },
                    fileAccess: [
                        {
                            DelegateFolderAuthID: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: "User",
                            },
                            AccessfileID: {
                                type: [String],
                                enum: ["Insert", "Update", "Delete", "View"],
                            },
                        },
                    ],
                    uploadedAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
    DelegatedPatientID: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            accessAccount: {
                type: [String],
                enum: ["Insert", "Update", "Delete", "View"],
            },
        },
    ],
    DelegateAuthID: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            accessAccount: {
                type: [String],
                enum: ["Insert", "Update", "Delete", "View"],
            },
        },
    ],
}, { timestamps: true });

userSchema.methods.hasFolderAccess = function (folderId, accessType) {
    return this.Folders.some(folder =>
        folder._id.equals(folderId) &&
        folder.folderAccess.some(access => access.AccessFolderID.includes(accessType))
    );
};

userSchema.methods.hasFileAccess = function (folderId, fileId, accessType) {
    const folder = this.Folders.find(folder => folder._id.equals(folderId));
    if (!folder) return false;

    const file = folder.files.find(file => file._id.equals(fileId));
    if (!file) return false;

    return file.fileAccess.some(access => access.AccessfileID.includes(accessType));
};

// 🔹 **Hash Password Before Saving to DB**
userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
