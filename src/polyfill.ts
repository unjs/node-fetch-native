import _fetch, {
  Blob as _Blob,
  File as _File,
  FormData as _FormData,
  Headers as _Headers,
  Request as _Request,
  Response as _Response,
} from "node-fetch";

import _AbortController from "abort-controller";

function polyfill(name: string, impl: any) {
  if (!(name in globalThis)) {
    try {
      globalThis[name] = impl;
    } catch {}
  }
}

polyfill("fetch", _fetch);
polyfill("Blob", _Blob);
polyfill("File", _File);
polyfill("FormData", _FormData);
polyfill("Headers", _Headers);
polyfill("Request", _Request);
polyfill("Response", _Response);
polyfill("AbortController", _AbortController);
