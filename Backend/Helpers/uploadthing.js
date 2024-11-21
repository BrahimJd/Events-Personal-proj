const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadThingConfig = {
  eventImage: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(() => {
      if (!process.env.UPLOADTHING_TOKEN) {
        throw new Error("UPLOADTHING_TOKEN is not configured");
      }
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file);
      return { url: file.url };
    }),
};

module.exports = uploadThingConfig;
