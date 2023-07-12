import { Blob, File, FormData, Headers, Request, Response } from "node-fetch";

const nodeFetchLookup = {
  fetch: (...args) => {
    // @ts-ignore
    return import("node-fetch").then(({ default: _fetch }) => _fetch(...args));
  },
  Blob,
  File,
  FormData,
  Headers,
  Request,
  Response,
};

function polyfill(name: string) {
  if (name in globalThis) {
    return;
  }

  Object.defineProperty(globalThis, name, {
    get: function () {
      Object.defineProperty(globalThis, name, {
        value: nodeFetchLookup[name],
        configurable: true,
        writable: true,
      });

      return globalThis[name];
    },
    configurable: true,
  });
}

for (const key in nodeFetchLookup) {
  polyfill(key);
}

if (!("AbortController" in globalThis)) {
  Object.defineProperty(globalThis, "AbortController", {
    configurable: true,
    get() {
      // eslint-disable-next-line unicorn/prefer-module
      const AbortController = require("abort-controller");
      return AbortController;
    },
  });
}
