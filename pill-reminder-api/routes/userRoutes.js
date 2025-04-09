const express = require("express");
const { getUsers, getUserById, createUser, getFolderById, getFileById } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router(); // Ensure router is defined properly

router.get("/allUsers", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", authMiddleware, createUser);
router.get("/folders/:folderId", authMiddleware, getFolderById);
router.get("/folders/:folderId/files/:fileId", authMiddleware, getFileById);

module.exports = router; // Ensure router is exported properly
