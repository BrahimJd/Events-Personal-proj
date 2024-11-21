const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadthingRouter = f({
  eventImage: {
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  },
})
  .middleware(async () => {
    return { uploadthingId: process.env.UPLOADTHING_TOKEN };
  })
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete for userId:", metadata.uploadthingId);
    console.log("file url", file.url);
    return { url: file.url };
  });

module.exports = uploadthingRouter;
