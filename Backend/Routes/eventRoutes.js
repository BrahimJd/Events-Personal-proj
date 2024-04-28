const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventcontroller");
const authMiddleware = require("../Middlewares/authMiddleware");

//Routes

// Route to create an event
router.post("/", authMiddleware, eventController.CreateEvent);
// Route to get all events
router.get("/", authMiddleware, eventController.GetAllEvents);
// Route to get a single event by ID
router.get("/:id", authMiddleware, eventController.GetEvent);
// Route to update an event by ID
router.put("/:id", authMiddleware, eventController.UpdateEvent);
// Route to delete an event by ID
router.delete("/:id", authMiddleware, eventController.DeleteEvent);

module.exports = router;
