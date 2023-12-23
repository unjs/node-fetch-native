import { fetch } from "node-fetch-native"; // or use global fetch
import { createProxy } from "node-fetch-native/proxy";

process.env.HTTPS_PROXY = "http://localhost:9080";
process.env.DEBUG = "true";

const proxy = createProxy();

const res = await fetch("https://icanhazip.com", {
  ...proxy,
});

console.log(await res.text());
