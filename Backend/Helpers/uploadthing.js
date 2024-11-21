const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadthingRouter = {
  eventImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      return { userId: "system" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file);
      return { url: file.url };
    }),
};

module.exports = uploadthingRouter;
