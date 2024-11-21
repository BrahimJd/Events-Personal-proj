const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://eventify-frontend-jbco.onrender.com"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "x-uploadthing-api-key",
      "x-uploadthing-upload-id",
      "x-uploadthing-upload-token",
      "x-uploadthing-version",
      "x-uploadthing-package",
      "uploadthing-client-version",
    ].join(", ")
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

router.post("/", (req, res, next) => {
  const handler = createRouteHandler(uploadthingRouter);
  handler(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
  });
});

module.exports = router;
