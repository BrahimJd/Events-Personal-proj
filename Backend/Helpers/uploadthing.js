const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

// Add error logging
const logError = (phase, error, context = {}) => {
  console.error(`[UploadThing ${phase} Error]`, {
    message: error.message,
    stack: error.stack,
    context,
  });
};

const uploadthingRouter = {
  eventImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      try {
        console.log("[UploadThing Middleware]", {
          headers: req?.headers,
          method: req?.method,
        });
        return { userId: "system" };
      } catch (error) {
        logError("Middleware", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("[Upload Complete]", {
          metadata,
          fileInfo: {
            name: file.name,
            size: file.size,
            type: file.type,
            url: file.url,
          },
        });
        return { url: file.url };
      } catch (error) {
        logError("Upload Complete", error, { metadata, file });
        throw error;
      }
    })
    .onUploadError((error) => {
      logError("Upload", error);
      throw error;
    }),
};

module.exports = uploadthingRouter;
