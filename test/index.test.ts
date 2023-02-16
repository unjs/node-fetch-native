import { createRequire } from "node:module";
import { expect, it, describe } from "vitest";

// ESM
import * as libraryESM from "../dist/index.mjs";
import defaultESM from "../dist/index.mjs";

// CJS
const require = createRequire(import.meta.url);
const libraryCJS = require("../lib/index.cjs");

const expectedExports = [
  "fetch",
  "Blob",
  "FormData",
  "Headers",
  "Request",
  "Response",
  "AbortController",
  "AbortError",
  "FetchError",
  "blobFrom",
  "blobFromSync",
  "fileFrom",
  "fileFromSync",
  "isRedirect",
];

const suites = [
  { name: "cjs", defaultExport: libraryCJS, exports: libraryCJS },
  { name: "esm", defaultExport: defaultESM, exports: libraryESM },
];

for (const s of suites) {
  describe("node-fetch-native:" + s.name, () => {
    it("default export", () => {
      expect(s.defaultExport).toBeDefined();
      expect(typeof s.defaultExport).toBe("function");
    });
    for (const exportName of expectedExports) {
      it("export:" + exportName, () => {
        expect(s.exports[exportName]).toBeDefined();
      });
    }
  });
}
