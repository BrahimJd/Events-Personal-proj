const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventcontroller");
const authMiddleware = require("../Middlewares/authentificationMiddleware");
const {
  authManager,
  authSponsor,
} = require("../Middlewares/authorizationMiddleware");
//Routes

// Route to create an event only for managers
router.post("/event", authMiddleware, authManager, eventController.CreateEvent);
// Route to get all events for sponsors and managers
router.get(
  "/get-events",
  authMiddleware,
  authSponsor,
  eventController.GetAllEvents
);
// Route to get a single event by ID for sponsors and managers
router.get("/get-event/:eventId", authMiddleware, eventController.GetEvent);
// Route to update an event by ID for managers
router.put(
  "/update/:eventId",
  authMiddleware,
  authManager,
  eventController.UpdateEvent
);
// Route to delete an event by ID for managers
router.delete(
  "/delete/:eventId",
  authMiddleware,
  authManager,
  eventController.DeleteEvent
);

module.exports = router;
