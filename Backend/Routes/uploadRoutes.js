const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const { ourFileRouter } = require("../Helpers/uploadthing");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[Upload ${req.method}]`, {
    url: req.url,
    query: req.query,
  });
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
