export function checkNodeEnvironment() {
  if (
    !globalThis.process?.versions?.node &&
    !globalThis.process?.env.DISABLE_NODE_FETCH_NATIVE_WARN
  ) {
    throw new Error(
      "Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.",
    );
  }
}
