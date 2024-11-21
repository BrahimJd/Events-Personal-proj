import { generateReactHelpers } from "@uploadthing/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const { useUploadThing } = generateReactHelpers({
  url: `${API_URL}/api/uploadthing`,
  config: {
    alwaysAcceptFiles: true,
    credentials: "include",
    headers: {
      "uploadthing-client-version": "1.0.0",
    },
  },
});
