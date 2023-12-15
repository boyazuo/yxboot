import type { PluginOption } from 'vite'

import Components from 'unplugin-vue-components/vite'

export function configComponentsPlugin() {
  const componentsPlugin: PluginOption = Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue', 'md'],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    dts: 'src/components.d.ts'
  })
  return componentsPlugin
}
