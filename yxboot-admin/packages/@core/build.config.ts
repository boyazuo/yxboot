import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/base/index',
    './src/runtime/index',
    './src/ui/index',
    './src/composables/index',
    './src/directives/index',
  ],
  declaration: true,
  clean: true,
  externals: ['vue', 'vue-router', 'pinia', 'axios'],
  rollup: {
    emitCJS: true,
  },
});
