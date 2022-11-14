import _fetch, {
  Blob as _Blob,
  File as _File,
  FormData as _FormData,
  Headers as _Headers,
  Request as _Request,
  Response as _Response
} from "node-fetch";

import _AbortController from "abort-controller";

globalThis.fetch = globalThis.fetch || _fetch as unknown as typeof globalThis.fetch;

globalThis.Blob = globalThis.Blob || _Blob;
globalThis.File = globalThis.File || _File;
globalThis.FormData = globalThis.FormData || _FormData;
globalThis.Headers = globalThis.Headers || _Headers;
globalThis.Request = globalThis.Request || _Request as unknown as typeof globalThis.Request;
globalThis.Response = globalThis.Response || _Response as unknown as typeof globalThis.Response;
globalThis.AbortController = globalThis.AbortController || _AbortController as unknown as typeof globalThis.AbortController;
