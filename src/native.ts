export const Blob = globalThis.Blob;
export const File = globalThis.File;
export const FormData = globalThis.FormData;
export const Headers = globalThis.Headers;
export const Request = globalThis.Request;
export const Response = globalThis.Response;
export const AbortController = globalThis.AbortController;

export const fetch =
  globalThis.fetch ||
  (() => {
    throw new Error(
      "[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!",
    );
  });
export default fetch;
