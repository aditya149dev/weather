import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface ErrorData {
  error?: {
    info: string;
  };
}

export const simpleErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (error) {
    if ("status" in error) {
      const fetchError = error as FetchBaseQueryError;
      if (
        fetchError.data &&
        typeof fetchError.data === "object" &&
        "error" in fetchError.data
      ) {
        const apiError = fetchError.data.error as ErrorData["error"];
        if (apiError && apiError.info) {
          return apiError.info;
        }
      }
    } else {
      const serializedError = error as SerializedError;
      return serializedError.message || null;
    }
  }
  return null;
};
