import _fetch from "node-fetch";
import { checkNodeEnvironment } from "./_utils";

export { Blob, File, FormData, Headers, Request, Response } from "node-fetch";
export { default as AbortController } from "abort-controller";

checkNodeEnvironment();

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
