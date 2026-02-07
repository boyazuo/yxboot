import AutoImport from 'unplugin-auto-import/vite'
import type { PluginOption } from 'vite'

export function configImportPlugin() {
  const importPlugin: PluginOption = AutoImport({
    imports: ['vue', 'vue-router', 'vue-i18n', 'vue/macros', '@vueuse/head', '@vueuse/core'],
    dts: 'src/auto-imports.d.ts',
    dirs: ['src/composables', 'src/stores'],
    vueTemplate: true,
  })
  return importPlugin
}
