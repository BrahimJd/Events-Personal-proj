const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");

const router = express.Router();

const uploadHandler = createRouteHandler(uploadthingRouter);

router.post("/", uploadHandler);

module.exports = router;
