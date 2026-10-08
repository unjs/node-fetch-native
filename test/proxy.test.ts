import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import pkg from "../package.json";
import * as proxyStub from "../src/proxy-stub";

const require = createRequire(import.meta.url);
const proxyNode = require("../dist/proxy.cjs");

describe("node-fetch-native/proxy:exports", () => {
  const runtimeConditions = [
    "browser",
    "bun",
    "deno",
    "edge-light",
    "edge-routine",
    "lagon",
    "netlify",
    "react-native",
    "wintercg",
    "worker",
    "workerd",
  ];

  it("exports map defines non-node runtime conditions pointing to proxy-stub", () => {
    const proxyExport = pkg.exports["./proxy"];
    expect(proxyExport).toBeDefined();

    for (const condition of runtimeConditions) {
      expect(
        proxyExport[condition as keyof typeof proxyExport],
        `condition ${condition} should point to proxy stub`,
      ).toBe("./dist/proxy-stub.mjs");
    }
  });

  it("exports map defines node condition pointing to proxy.cjs", () => {
    const proxyExport = pkg.exports["./proxy"];
    expect(proxyExport.node).toEqual({
      types: "./lib/proxy.d.ts",
      default: "./dist/proxy.cjs",
    });
  });

  it("exports map defines fallback conditions", () => {
    const proxyExport = pkg.exports["./proxy"];
    expect(proxyExport.import).toBe("./dist/proxy-stub.mjs");
    expect(proxyExport.require).toBe("./dist/proxy-stub.cjs");
    expect(proxyExport.default).toBe("./dist/proxy-stub.mjs");
    expect(proxyExport.types).toBe("./lib/proxy.d.ts");
  });
});

describe("node-fetch-native/proxy:stub", () => {
  it("exports createProxy returning undefined agent and dispatcher", () => {
    const proxy = proxyStub.createProxy();
    expect(proxy).toEqual({
      agent: undefined,
      dispatcher: undefined,
    });
  });

  it("exports createFetch returning global fetch", () => {
    expect(proxyStub.createFetch()).toBe(globalThis.fetch);
  });

  it("exports fetch matching global fetch", () => {
    expect(proxyStub.fetch).toBe(globalThis.fetch);
  });
});

describe("node-fetch-native/proxy:node", () => {
  it("exports expected symbols in node proxy cjs", () => {
    expect(typeof proxyNode.createProxy).toBe("function");
    expect(typeof proxyNode.createFetch).toBe("function");
    expect(typeof proxyNode.fetch).toBe("function");
  });

  it("creates agent when no options provided", () => {
    const proxy = proxyNode.createProxy();
    expect(proxy).toBeDefined();
  });
});
