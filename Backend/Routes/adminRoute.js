const express = require("express");
const router = express.Router();
const authcontroller = require("../Controllers/authcontroller");
const permscontroller = require("../Controllers/permscontroller");

// Routes to add permissions
router.post("/add-permission", permscontroller.addPermission);
//Routes to get permissions
router.get("/get-permission", permscontroller.getPermission);
//Routes to delete permissions
router.post("/delete-permission/:id", permscontroller.deletePermission);
//Routes to update permissions
router.post("/update-permission/:id", permscontroller.updatePermission);