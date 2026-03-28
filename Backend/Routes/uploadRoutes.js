const express = require("express");
const { createRouteHandler } = require("uploadthing/express");
const uploadThingConfig = require("../Helpers/uploadthing");

const router = express.Router();

const uploadHandler = createRouteHandler({
  router: uploadThingConfig,
  config: {
    isDev: process.env.NODE_ENV === "development",
  },
});

const handleUpload = (req, res) => {
  try {
    return uploadHandler(req, res);
  } catch (error) {
    console.error("[UploadThing Error]", error);
    return res.status(500).json({
      error: "Upload failed",
      message: error.message,
    });
  }
};

router.use("/", handleUpload);

module.exports = router;
