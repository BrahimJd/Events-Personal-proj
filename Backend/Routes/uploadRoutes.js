const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadThingConfig = require("../Helpers/uploadthing");

const router = express.Router();

const uploadHandler = createRouteHandler(uploadThingConfig);

router.use("/", (req, res, next) => {
  try {
    uploadHandler(req, res, next);
  } catch (error) {
    console.error("Error in upload route:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
