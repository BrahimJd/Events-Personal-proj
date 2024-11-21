const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const { ourFileRouter } = require("../Helpers/uploadthing");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    console.log("Router config:", ourFileRouter);
    const handler = createRouteHandler(ourFileRouter);
    return handler(req, res);
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
