# node-fetch-native

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
<!-- [![Codecov][codecov-src]][codecov-href] -->

A redistribution of [node-fetch v3](https://github.com/node-fetch/node-fetch) for better backward and forward compatibility.

Why this package?

- We can no longer `require('node-fetch')` with latest version. This stopped popular libraries from upgrading and dependency conflicts between `node-fetch@2` and `node-fetch@3`.
- With upcoming versions of Node.js, native `fetch` is being supported. We are prepared for native fetch support using this package yet keep supporting older Node versions.

✅ Prefer to **native globals** when available (`fetch`, `Blob`, `File`, `FormData`, `Headers`, `Request`, and `Response`) when available (Node.js [experimental fetch](https://nodejs.org/dist/latest-v17.x/docs/api/cli.html#--experimental-fetch))

✅ Compact build and less install size with **zero dependencies**

✅ Support both **CommonJS** (`require`) and **ESM** (`import`) usage

✅ Use native version if imported without `node` condition using [conditional exports](https://nodejs.org/api/packages.html#packages_conditional_exports) with **zero bundle overhead**

## Usage

Install `node-fetch-native` dependency:

```sh
# npm
npm i node-fetch-native

# yarn
yarn add node-fetch-native

# pnpm
pnpm i node-fetch-native
```

You can now either import or require the dependency:

```js
// ESM
import fetch from `node-fetch-native`

// CommonJS
const fetch = require('node-fetch-native')
```

Other exports:

```js
// ESM
import { fetch, Blob, FormData, Headers, Request, Response } from `node-fetch-native`

// CommonJS
const { fetch, Blob, FormData, Headers, Request, Response } = require('node-fetch-native')
```

## Alias to `node-fetch`

Using this method, you can ensure all project dependencies and usages of `node-fetch` can benefit from improved `node-fetch-native` and won't conflict between `node-fetch@2` and `node-fetch@3`.

### npm

Using npm [overrides](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides):

```jsonc
// package.json
{
  "overrides": {
    "node-fetch": "npm:node-fetch-native@latest"
  }
}
```

### yarn

Using yarn [selective dependency resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/):

```jsonc
// package.json
{
  "resolutions": {
    "node-fetch": "npm:node-fetch-native@latest"
  }
}
```

### pnpm

Using [pnpm.overrides](https://pnpm.io/package_json#pnpmoverrides):

```jsonc
// package.json
{
  "pnpm": {
    "overrides": {
      "node-fetch": "npm:node-fetch-native@latest"
    }
  }
}
```

## License

Made with 💛

[node-fetch is published under the MIT license](https://github.com/node-fetch/node-fetch/blob/main/LICENSE.md)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/node-fetch-native?style=flat-square
[npm-version-href]: https://npmjs.com/package/node-fetch-native

[npm-downloads-src]: https://img.shields.io/npm/dm/node-fetch-native?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/node-fetch-native

[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/node-fetch-native/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/node-fetch-native/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/unjs/node-fetch-native/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/node-fetch-native -->
