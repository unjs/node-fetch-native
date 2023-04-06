import _fetch from "node-fetch";

export { Blob, File, FormData, Headers, Request, Response } from "node-fetch";
export { default as AbortController } from "abort-controller";

export const fetch = _fetch;
export default fetch;

export {
  AbortError,
  FetchError,
  blobFrom,
  blobFromSync,
  fileFrom,
  fileFromSync,
  isRedirect,
} from "node-fetch";
