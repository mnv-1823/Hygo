const express = require("express");
const { getAllUsers, deleteUser, updateUserRole } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, deleteUser);
router.patch("/users/:id/role", authMiddleware, updateUserRole);

module.exports = router;
