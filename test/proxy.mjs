import { fetch } from "node-fetch-native/proxy";

process.env.HTTPS_PROXY = "http://localhost:9080";
process.env.DEBUG = "true";

console.log(await fetch("https://icanhazip.com"));
