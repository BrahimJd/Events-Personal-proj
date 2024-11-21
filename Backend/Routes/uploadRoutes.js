const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");

const router = express.Router();

router.post("/", (req, res) => {
  const handler = createRouteHandler(uploadthingRouter);
  return handler(req, res);
});

module.exports = router;
