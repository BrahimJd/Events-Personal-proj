const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const fileRouter = require("../Helpers/uploadthing");

const router = express.Router();

const uploadHandler = createRouteHandler({
  router: fileRouter,
});

router.get("/", (req, res) => {
  res.send({ message: "Upload endpoint running" });
});

router.post("/", uploadHandler);

module.exports = router;
