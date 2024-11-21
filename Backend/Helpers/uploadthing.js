const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadthingRouter = {
  eventImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      if (!process.env.UPLOADTHING_TOKEN) {
        throw new Error("Missing UPLOADTHING_TOKEN");
      }
      return { uploadthingId: process.env.UPLOADTHING_TOKEN };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file);
      return { url: file.url };
    }),
};

module.exports = uploadthingRouter;
