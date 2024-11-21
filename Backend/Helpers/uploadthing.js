const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const ourFileRouter = {
  eventImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "system" };
    })
    .onUploadComplete((res) => {
      console.log("Upload completed", res);
      return { url: res.file.url };
    }),
};

module.exports = { ourFileRouter };
