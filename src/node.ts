import _fetch from "node-fetch";

import _AbortController from "abort-controller";

export { Blob, File, FormData, Headers, Request, Response } from "node-fetch";

export const fetch = _fetch;
export default fetch;

export const AbortController = globalThis.AbortController || _AbortController;

export {
  AbortError,
  FetchError,
  blobFrom,
  blobFromSync,
  fileFrom,
  fileFromSync,
  isRedirect,
} from "node-fetch";
