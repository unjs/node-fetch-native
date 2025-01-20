import unjs from "eslint-config-unjs";

// https://github.com/unjs/eslint-config
export default unjs({
  ignores: [
    "lib/empty.mjs",
    "lib/empty.cjs"
  ],
  rules: {
    "unicorn/expiring-todo-comments": 0,
    "@typescript-eslint/no-require-imports": 0,
  },
});
