import _fetch, {
  Blob as _Blob,
  File as _File,
  FormData as _FormData,
  Headers as _Headers,
  Request as _Request,
  Response as _Response
} from 'node-fetch'

import _AbortController from 'abort-controller'

// Hotfix for https://github.com/unjs/node-fetch-native/issues/10
const isStackblitz = process.env.SHELL === '/bin/jsh'
if (isStackblitz && !globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = (url: any, opts: any) => {
    if (typeof url === 'string' && url.includes('//[::]')) {
      url = url.replace('//[::]', '//0.0.0.0')
    }
    return fetch(url, opts)
  }
}

export const fetch = globalThis.fetch || _fetch
export default fetch

export const Blob = globalThis.Blob || _Blob
export const File = globalThis.File || _File
export const FormData = globalThis.FormData || _FormData
export const Headers = globalThis.Headers || _Headers
export const Request = globalThis.Request || _Request
export const Response = globalThis.Response || _Response
export const AbortController = globalThis.AbortController || _AbortController

export {
  AbortError,
  FetchError,
  blobFrom,
  blobFromSync,
  fileFrom,
  fileFromSync,
  isRedirect
} from 'node-fetch'
