import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      target: 'es2020',
      minify: true,
      minifyIdentifiers: false,
      minifySyntax: false,
      minifyWhitespace: false,
      keepNames: true,
    },
  },
  entries: [
    "src/index",
    "src/native",
    "src/polyfill",
    "src/node",
    "src/proxy",
    "src/proxy-stub",
  ],
  externals: ["node-fetch-native"],
  hooks: {
    async "build:done"(ctx) {
      // Save few bytes from dist...
      await rm(resolve(ctx.options.outDir, "proxy.mjs"));
    },
  },
});
