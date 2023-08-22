import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
  entries: ["src/index", "src/native", "src/polyfill", "src/node"],
});
