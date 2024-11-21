const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadthingRouter = {
  eventImage: f
    .image({
      maxFileSize: "4MB",
      maxFileCount: 1,
    })
    .middleware(async () => {
      return { uploadthingId: process.env.UPLOADTHING_TOKEN };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),
};

module.exports = uploadthingRouter;
