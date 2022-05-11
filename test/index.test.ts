import { createRequire } from 'node:module'
import { expect, it, describe } from 'vitest'

// ESM
import * as libESM from '../dist/index.mjs'
import defaultESM from '../dist/index.mjs'

// CJS
const require = createRequire(import.meta.url)
const libCJS = require('../lib/index.cjs')

const expectedExports = ['fetch', 'Blob', 'FormData', 'Headers', 'Request', 'Response']

const suites = [
  { name: 'cjs', defaultExport: libCJS, exports: libCJS },
  { name: 'esm', defaultExport: defaultESM, exports: libESM }
]

for (const s of suites) {
  describe('node-fetch-native:' + s.name, () => {
    it('default export', () => {
      expect(s.defaultExport).toBeDefined()
      expect(typeof s.defaultExport).toBe('function')
    })
    for (const exportName of expectedExports) {
      it('export:' + exportName, () => {
        expect(s.exports[exportName]).toBeDefined()
      })
    }
  })
}
