const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");

const router = express.Router();

// Add request logging
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

router.post("/", async (req, res) => {
  try {
    const handler = createRouteHandler(uploadthingRouter);

    await new Promise((resolve, reject) => {
      handler(req, res, (error) => {
        if (error) {
          console.error("[Upload Handler Error]", {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
          });
          reject(error);
        }
        resolve();
      });
    });
  } catch (error) {
    console.error("[Upload Route Error]", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
});

module.exports = router;
