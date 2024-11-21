const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");

const router = express.Router();

console.log("Loaded uploadthingRouter:", uploadthingRouter);

router.use((req, res, next) => {
  console.log("[Upload Request]", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
  });
  next();
});

router.post("/", (req, res) => {
  if (!uploadthingRouter || !uploadthingRouter.eventImage) {
    console.error(
      "Invalid uploadthingRouter configuration:",
      uploadthingRouter
    );
    return res.status(500).json({
      error: "Upload configuration error",
    });
  }

  try {
    const handler = createRouteHandler(uploadthingRouter);
    return handler(req, res);
  } catch (error) {
    console.error("Upload handler error:", error);
    return res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
});

module.exports = router;
