import type * as http from "node:http";
import type * as https from "node:https";
import type * as undici from "undici";

export type ProxyOptions = { url?: string };

export declare const createProxy: (opts?: ProxyOptions) => {
  agent: http.Agent | https.Agent | undefined;
  dispatcher: undici.Dispatcher | undefined;
};

export declare const createFetch: (
  proxyOptions?: ProxyOptions,
) => typeof globalThis.fetch;

export declare const fetch: typeof globalThis.fetch;
