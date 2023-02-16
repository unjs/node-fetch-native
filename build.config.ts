import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      target: "es2019",
    },
  },
  entries: ["src/index", "src/native", "src/polyfill"],
});
