const express = require("express");
const router = express.Router();
const userController = require("../Controllers/usercontroller");
const authMiddleware = require("../Middlewares/authentificationMiddleware");

//Routes

// Route to update a user by ID
router.put("/:id", authMiddleware, userController.UpdateUser);
// Route to delete a user by ID
router.delete("/:id", authMiddleware, userController.DeleteUser);
// Route to get all users
router.get("/", authMiddleware, userController.GetAllUsers);
// Route to get a user by ID
router.get("/:id", authMiddleware, userController.GetUser);

module.exports = router;
