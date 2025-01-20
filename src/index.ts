import {
  fetch as _fetch,
  AbortController as _AbortController,
  Blob as _Blob,
  File as _File,
  FormData as _FormData,
  Headers as _Headers,
  Request as _Request,
  Response as _Response,
} from "./node";

export {
  AbortError,
  FetchError,
  blobFrom,
  blobFromSync,
  fileFrom,
  fileFromSync,
  isRedirect,
} from "./node";

const _forceNodeFetch = !!globalThis.process?.env?.FORCE_NODE_FETCH;

export const fetch = (!_forceNodeFetch && globalThis.fetch) || _fetch;
export default fetch;

export const Blob = (!_forceNodeFetch && globalThis.Blob) || _Blob;
export const File = (!_forceNodeFetch && globalThis.File) || _File;
export const FormData = (!_forceNodeFetch && globalThis.FormData) || _FormData;
export const Headers = (!_forceNodeFetch && globalThis.Headers) || _Headers;
export const Request = (!_forceNodeFetch && globalThis.Request) || _Request;
export const Response = (!_forceNodeFetch && globalThis.Response) || _Response;
export const AbortController =
  (!_forceNodeFetch && globalThis.AbortController) || _AbortController;
