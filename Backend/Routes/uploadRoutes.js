const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");

const router = express.Router();

router.post("/", (req, res, next) => {
  createRouteHandler(uploadthingRouter)(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
    next();
  });
});

module.exports = router;
