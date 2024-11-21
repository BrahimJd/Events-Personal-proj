const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadthingRouter = require("../Helpers/uploadthing");
const cors = require("cors");

const router = express.Router();

const corsOptions = {
  origin: "https://eventify-frontend-jbco.onrender.com",
  methods: ["POST", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "x-uploadthing-api-key",
    "x-uploadthing-upload-id",
    "x-uploadthing-upload-token",
    "x-uploadthing-package",
    "x-uploadthing-version",
    "x-uploadthing-token",
    "x-uploadthing-user",
  ],
  credentials: true,
};

router.options("/", cors(corsOptions));

router.post("/", cors(corsOptions), createRouteHandler(uploadthingRouter));

module.exports = router;
