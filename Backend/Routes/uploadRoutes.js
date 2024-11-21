const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const fileRouter = require("../Helpers/uploadthing");

const router = express.Router();

const uploadHandler = createRouteHandler(fileRouter);

router.get("/", (req, res) => {
  res.send({ message: "Upload endpoint running" });
});

router.post("/", (req, res, next) => {
  if (!Array.isArray(req.body?.files)) {
    req.body.files = [].concat(req.body.files || []);
  }
  uploadHandler(req, res, next);
});

module.exports = router;
