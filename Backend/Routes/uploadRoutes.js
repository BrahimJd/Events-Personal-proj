const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const { ourFileRouter } = require("../Helpers/uploadthing");

const router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:10000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.use("/", (req, res) => {
  try {
    const handler = createRouteHandler(ourFileRouter);
    return handler(req, res);
  } catch (error) {
    console.error(`${req.method} handler error:`, error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
