const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");

const router = express.Router();

router.options("/", (req, res) => {
  res.status(204).end();
});

router.post("/", (req, res) => {
  createRouteHandler(uploadthingRouter)(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
  });
});

module.exports = router;
