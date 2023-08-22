import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      minify: true,
      minifyIdentifiers: false,
      minifySyntax: false,
      minifyWhitespace: false,
      keepNames: true,
    },
  },
  entries: ["src/index", "src/native", "src/polyfill", "src/node"],
});
