const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");
const cors = require("cors");

const router = express.Router();

const corsOptions = {
  origin: "https://eventify-frontend-jbco.onrender.com",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: "*",
};

router.use(cors(corsOptions));

router.post("/", async (req, res) => {
  try {
    const handler = createRouteHandler(uploadthingRouter);
    return handler(req, res);
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
