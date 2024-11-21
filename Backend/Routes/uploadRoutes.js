// Routes/uploadRoutes.js
const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadThingConfig = require("../Helpers/uploadthing");

const router = express.Router();

// Create route handler with config
const uploadHandler = createRouteHandler({
  router: uploadThingConfig,
});

// Use single route handler for both GET and POST
router.use("/", uploadHandler);

module.exports = router;
