const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadthingRouter = {
  eventImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => {
      return { userId: "system" };
    })
    .onUploadComplete(({ file }) => {
      console.log("Upload complete:", file);
      return { url: file.url };
    }),
};

console.log("Exporting uploadthingRouter:", uploadthingRouter);

if (!uploadthingRouter || !uploadthingRouter.eventImage) {
  throw new Error("Invalid uploadthing configuration");
}

module.exports = uploadthingRouter;
