# node-fetch-compat

[![bundle size](https://flat.badgen.net/bundlephobia/minzip/node-fetch-compat)](https://bundlephobia.com/package/node-fetch-compat)

A redistribution of [node-fetch](https://github.com/node-fetch/node-fetch) (latest, v3) for better compatibility:

✅ Prefer to native globals when available (`fetch`, `Blob`, `FormData`, `Headers`, `Request`, `Response`)

✅ Compact build and less install size with zero dependencies

✅ Allow both CommonJS (`require`) and ESM (`import`) usage

✅ Automatically use zero-overhead native wrappers if imported without `node` condition (for Browseers) using export conditions

## Usage

Install `node-fetch-compat` dependency:

```sh
# npm
npm i node-fetch-compat

# yarn
yarn add node-fetch-compat

# pnpm
pnpm i node-fetch-compat
```

You can now either import or require the dependency:

```js
// ESM
import fetch from `node-fetch-compat`

// CommonJS
const fetch = require('node-fetch-compat')
```

Other exports:

```js
// ESM
import { fetch, Blob, FormData, Headers, Request, Response } from `node-fetch-compat`

// CommonJS
const { fetch, Blob, FormData, Headers, Request, Response } = require('node-fetch-compat')
```

## License

[MIT](https://github.com/node-fetch/node-fetch/blob/main/LICENSE.md)
