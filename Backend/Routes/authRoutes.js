const express = require("express");
const router = express.Router();
const authcontroller = require("../Controllers/authcontroller");

// Routes

// Route to register a user
router.post("/register", authcontroller.register);
// Route to login a user
router.post("/login", authcontroller.login);
// Route to refresh token
router.post("/refresh-token", authcontroller.refreshToken);
// Route to logout a user

module.exports = router;
