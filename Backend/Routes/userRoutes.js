const express = require("express");
const router = express.Router();
const userController = require("../Controllers/usercontroller");
const authMiddleware = require("../Middlewares/authentificationMiddleware");
const { authManager } = require("../Middlewares/authorizationMiddleware");

//Routes

// Route to update a user by ID for managers
router.put(
  "/Dashboard/:id",
  authMiddleware,
  authManager,
  userController.UpdateUser
);
// Route to delete a user by ID for managers
router.delete(
  "/Dashboard/:id",
  authMiddleware,
  authManager,
  userController.DeleteUser
);
// Route to get all users for managers
router.get(
  "/Dashboard",
  authMiddleware,
  authManager,
  userController.GetAllUsers
);
// Route to get a user by ID for managers
router.get("/Dashboard/:id", authMiddleware, userController.GetUser);

module.exports = router;
