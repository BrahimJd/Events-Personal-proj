import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing } = generateReactHelpers({
  url: "http://localhost:3000/api/uploadthing",
  headers: {
    Accept: "application/json",
  },
});
