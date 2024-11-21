const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const fileRouter = require("../Helpers/uploadthing");

const router = express.Router();

const uploadHandler = createRouteHandler({
  router: fileRouter,
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});

router.post("/", (req, res, next) => {
  try {
    if (req.body && req.body.files) {
      req.body.files = Array.isArray(req.body.files)
        ? req.body.files
        : [req.body.files];
    }
    uploadHandler(req, res, next);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
