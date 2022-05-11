import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  },
  entries: [
    'src/index',
    'src/native'
  ]
})
