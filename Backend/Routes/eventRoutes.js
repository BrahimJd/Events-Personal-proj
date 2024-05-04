const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventcontroller");
const authMiddleware = require("../Middlewares/authentificationMiddleware");

//Routes

// Route to create an event
router.post("/", authMiddleware, eventController.CreateEvent);
// Route to get all events
router.get("/all", authMiddleware, eventController.GetAllEvents);
// Route to get a single event by ID
router.get("/:eventId", authMiddleware, eventController.GetEvent);
// Route to update an event by ID
router.put("/:eventId", authMiddleware, eventController.UpdateEvent);
// Route to delete an event by ID
router.delete("/:eventId", authMiddleware, eventController.DeleteEvent);

module.exports = router;
