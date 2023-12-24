import * as http from "node:http";
import * as https from "node:https";
import { URL } from "node:url";
import { Agent as _UndiciAgent, ProxyAgent as _UndiciProxyAgent } from "undici";
import { Agent, AgentConnectOpts } from "agent-base";
import { HttpProxyAgent } from "http-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";
import type { ProxyOptions } from "../proxy";
import { fetch as _fetch } from "node-fetch-native";

// ----------------------------------------------
// Utils
// ----------------------------------------------

function debug(...args: any[]) {
  if (process.env.DEBUG) {
    console.debug("[node-fetch-native] [proxy]", ...args);
  }
}

function bypassProxy(host: string, noProxy: string[]) {
  if (!noProxy) {
    return false;
  }
  for (const _host of noProxy) {
    if (_host === host || (_host[0] === "." && host.endsWith(_host.slice(1)))) {
      return true;
    }
  }
  return false;
}

// ----------------------------------------------
// Undici Agent
// ----------------------------------------------

// https://github.com/nodejs/undici/blob/main/lib/proxy-agent.js

class UndiciProxyAgent extends _UndiciProxyAgent {
  _agent: _UndiciAgent;

  constructor(
    private _options: _UndiciProxyAgent.Options & { noProxy: string[] },
  ) {
    super(_options);
    this._agent = new _UndiciAgent();
  }

  dispatch(options, handler): boolean {
    const hostname = new URL(options.origin).hostname;
    if (bypassProxy(hostname, this._options.noProxy)) {
      debug(`Bypassing proxy for: ${hostname}`);
      return this._agent.dispatch(options, handler);
    }
    return super.dispatch(options, handler);
  }
}

// ----------------------------------------------
// HTTP Agent
// ----------------------------------------------

// https://github.com/TooTallNate/proxy-agents/tree/main/packages/proxy-agent

const PROTOCOLS = ["http", "https"] as const;

type ValidProtocol = (typeof PROTOCOLS)[number];
type AgentConstructor = new (...args: never[]) => Agent;

const proxies: {
  [P in ValidProtocol]: [AgentConstructor, AgentConstructor];
} = {
  http: [HttpProxyAgent, HttpsProxyAgent],
  https: [HttpProxyAgent, HttpsProxyAgent],
};

function isValidProtocol(v: string): v is ValidProtocol {
  return (PROTOCOLS as readonly string[]).includes(v);
}

class NodeProxyAgent extends Agent {
  cache: Map<string, Agent> = new Map();

  httpAgent: http.Agent;
  httpsAgent: http.Agent;

  constructor(private _options: { uri: string; noProxy: string[] }) {
    super({});
    this.httpAgent = new http.Agent({});
    this.httpsAgent = new https.Agent({});
  }

  connect(req: http.ClientRequest, opts: AgentConnectOpts): http.Agent {
    const isWebSocket = req.getHeader("upgrade") === "websocket";

    // prettier-ignore
    const protocol = opts.secureEndpoint
      ? (isWebSocket ? "wss:" : "https:")
      : (isWebSocket ? "ws:" : "http:");

    const host = req.getHeader("host") as string;

    if (bypassProxy(host, this._options.noProxy)) {
      return opts.secureEndpoint ? this.httpsAgent : this.httpAgent;
    }

    // Attempt to get a cached `http.Agent` instance first
    const cacheKey = `${protocol}+${this._options.uri}`;
    let agent = this.cache.get(cacheKey);
    if (!agent) {
      const proxyUrl = new URL(this._options.uri);
      const proxyProto = proxyUrl.protocol.replace(":", "");
      if (!isValidProtocol(proxyProto)) {
        throw new Error(
          `Unsupported protocol for proxy URL: ${this._options.uri}`,
        );
      }
      const Ctor =
        proxies[proxyProto][opts.secureEndpoint || isWebSocket ? 1 : 0];
      agent = new (Ctor as any)(this._options.uri, this._options);
      this.cache.set(cacheKey, agent);
    }

    return agent;
  }

  destroy(): void {
    for (const agent of this.cache.values()) {
      agent.destroy();
    }
    super.destroy();
  }
}

// ----------------------------------------------
// Main exports
// ----------------------------------------------

export function createProxy(opts: ProxyOptions = {}) {
  const uri =
    opts.url ||
    process.env.https_proxy ||
    process.env.http_proxy ||
    process.env.HTTPS_PROXY ||
    process.env.HTTP_PROXY;

  if (!uri) {
    return {
      agent: undefined,
      dispatcher: undefined,
    };
  }

  const _noProxy = opts.noProxy || process.env.no_proxy || process.env.NO_PROXY;
  const noProxy = typeof _noProxy === "string" ? _noProxy.split(",") : _noProxy;

  const nodeAgent = new NodeProxyAgent({ uri, noProxy });

  // https://undici.nodejs.org/#/docs/api/ProxyAgent
  const undiciAgent = new UndiciProxyAgent({
    uri,
    noProxy,
  });

  return {
    agent: nodeAgent,
    dispatcher: undiciAgent,
  };
}

export function createFetch(proxyOptions: ProxyOptions = {}) {
  const proxy = createProxy(proxyOptions);
  return (url, fetchOptions) => _fetch(url, { ...proxy, ...fetchOptions });
}

export const fetch = createFetch({});
