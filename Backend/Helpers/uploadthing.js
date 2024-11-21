const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

// Authentication middleware
const handleAuth = async (req) => {
  if (!process.env.UPLOADTHING_SECRET || !process.env.UPLOADTHING_APP_ID) {
    throw new Error("Missing UploadThing credentials");
  }
  return {
    userId: "system",
    uploadthingId: process.env.UPLOADTHING_APP_ID,
  };
};

const uploadthingRouter = {
  eventImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
      accept: ["image/jpeg", "image/png", "image/webp"],
    },
  })
    .middleware(handleAuth)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.name);
      return { url: file.url };
    })
    .onUploadError((error) => {
      console.error("Upload error:", error.message);
      throw error;
    }),
};

module.exports = uploadthingRouter;
