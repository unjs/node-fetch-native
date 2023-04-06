import _fetch, {
  Blob as _Blob,
  File as _File,
  FormData as _FormData,
  Headers as _Headers,
  Request as _Request,
  Response as _Response,
} from "node-fetch";

import _AbortController from "abort-controller";

const _forceNodeFetch =
  typeof process !== undefined &&
  typeof process.env !== undefined &&
  process.env.FORCE_NODE_FETCH;

function _getFetch() {
  if (!_forceNodeFetch && globalThis.fetch) {
    return globalThis.fetch;
  }
  return _fetch;
}

export const fetch = _getFetch();
export default fetch;

export const Blob = (!_forceNodeFetch && globalThis.Blob) || _Blob;
export const File = (!_forceNodeFetch && globalThis.File) || _File;
export const FormData = (!_forceNodeFetch && globalThis.FormData) || _FormData;
export const Headers = (!_forceNodeFetch && globalThis.Headers) || _Headers;
export const Request = (!_forceNodeFetch && globalThis.Request) || _Request;
export const Response = (!_forceNodeFetch && globalThis.Response) || _Response;
export const AbortController = (!_forceNodeFetch && globalThis.AbortController) || _AbortController;

export {
  AbortError,
  FetchError,
  blobFrom,
  blobFromSync,
  fileFrom,
  fileFromSync,
  isRedirect,
} from "node-fetch";
