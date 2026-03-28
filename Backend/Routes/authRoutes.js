const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

// Routes

// Route to register a user
router.post("/register", authController.register);
// Route to login a user
router.post("/login", authController.login);
// Route to refresh token
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
