import type * as http from "node:http";
import type * as https from "node:https";
import type * as undici from "undici";

export declare const createProxy: (opts?: { url?: string }) => {
  agent: http.Agent | https.Agent | undefined;
  dispatcher: undici.Dispatcher | undefined;
};
