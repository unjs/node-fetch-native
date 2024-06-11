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

checkNodeEnvironment();

function checkNodeEnvironment() {
  if (
    !globalThis.process?.versions?.node &&
    !globalThis.process?.env?.DISABLE_NODE_FETCH_NATIVE_WARN
  ) {
    console.warn(
      "[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.",
    );
  }
}
