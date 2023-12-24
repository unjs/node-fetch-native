import { createFetch } from "node-fetch-native/proxy";

const fetch = createFetch({ url: "http://localhost:9080" });

console.log(await fetch("https://icanhazip.com").then((r) => r.text()));
