import _fetch, {
  Blob as _Blob,
  File as _File,
  FormData as _FormData,
  Headers as _Headers,
  Request as _Request,
  Response as _Response
} from 'node-fetch'

export const fetch = globalThis.fetch || _fetch
export default fetch

export const Blob = globalThis.Blob || _Blob
export const File = globalThis.File || _File
export const FormData = globalThis.FormData || _FormData
export const Headers = globalThis.Headers || _Headers
export const Request = globalThis.Request || _Request
export const Response = globalThis.Response || _Response

export {
  AbortError,
  FetchError,
  blobFrom,
  blobFromSync,
  fileFrom,
  fileFromSync,
  isRedirect
} from 'node-fetch'
