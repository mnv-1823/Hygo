const User = require("../models/User");

// Fetch all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Users fetched successfully", data: users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Fetch a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User fetched successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

// Fetch a folder by ID with access validation
exports.getFolderById = async (req, res) => {
    try {
        const { folderId } = req.params;
        const user = await User.findById(req.user.id);

        if (!user.hasFolderAccess(folderId, "View")) {
            return res.status(403).json({ message: "Access Denied" });
        }

        const folder = user.Folders.id(folderId);
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        res.status(200).json({ message: "Folder fetched successfully", data: folder });
    } catch (error) {
        res.status(500).json({ message: "Error fetching folder", error: error.message });
    }
};

// Fetch a file by ID with access validation
exports.getFileById = async (req, res) => {
    try {
        const { folderId, fileId } = req.params;
        const user = await User.findById(req.user.id);

        if (!user.hasFileAccess(folderId, fileId, "View")) {
            return res.status(403).json({ message: "Access Denied" });
        }

        const folder = user.Folders.id(folderId);
        const file = folder.files.id(fileId);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        res.status(200).json({ message: "File fetched successfully", data: file });
    } catch (error) {
        res.status(500).json({ message: "Error fetching file", error: error.message });
    }
};
