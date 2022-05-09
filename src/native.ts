export const Blob = globalThis.Blob
export const FormData = globalThis.FormData
export const Headers = globalThis.Headers
export const Request = globalThis.Request
export const Response = globalThis.Response

export const fetch = globalThis.fetch || (() => { throw new Error('global fetch is not available!') })
export default fetch
