const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventcontroller");
const authMiddleware = require("../Middlewares/authentificationMiddleware");
const {
  authManager,
  authSponsor,
} = require("../Middlewares/authorizationMiddleware");

// Routes
router.post(
  "/event",
  authMiddleware,
  authManager,
  authSponsor,
  eventController.CreateEvent
);
router.get("/get-events", authMiddleware, eventController.GetAllEvents);
router.get("/get-event/:eventId", authMiddleware, eventController.GetEvent);
router.put(
  "/update/:eventId",
  authMiddleware,
  authManager,
  eventController.UpdateEvent
);
router.delete(
  "/delete/:eventId",
  authMiddleware,
  authManager,
  eventController.DeleteEvent
);

module.exports = router;
