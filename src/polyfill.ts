import _fetch, {
  Blob as _Blob,
  File as _File,
  FormData as _FormData,
  Headers as _Headers,
  Request as _Request,
  Response as _Response,
} from "node-fetch";

import _AbortController from "abort-controller";

function lazyPolyfill(name: string, impl: any) {
  if (name in globalThis) {
    return;
  }

  Object.defineProperty(globalThis, name, {
    get: () => {
      Object.defineProperty(globalThis, name, {
        value: impl,
        configurable: true,
        enumerable: true,
        writable: true,
      });
      return globalThis[name];
    },
    configurable: true,
    enumerable: true,
  });
}

lazyPolyfill("fetch", _fetch);
lazyPolyfill("Blob", _Blob);
lazyPolyfill("File", _File);
lazyPolyfill("FormData", _FormData);
lazyPolyfill("Headers", _Headers);
lazyPolyfill("Request", _Request);
lazyPolyfill("Response", _Response);
lazyPolyfill("AbortController", _AbortController);
