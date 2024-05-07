const express = require("express");
const router = express.Router();
const Role = require("../Modules/Role");

// Create a new role
router.post("/Roles", async (req, res) => {
  try {
    // Extract the role data from the request body
    const { name, description, permissions } = req.body;

    // Check if the role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    // Create a new role
    const newRole = await Role.create({
      name,
      description,
      permissions,
    });

    // Return the newly created role
    const savedRole = await newRole.save();

    res.status(201).json(savedRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the role" });
  }
});

module.exports = router;
