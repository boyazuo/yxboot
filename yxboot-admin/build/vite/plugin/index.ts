import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'

import UnoCSS from 'unocss/vite'
import purgeIcons from 'vite-plugin-purge-icons'

import { createAppConfigPlugin } from './appConfig'
import { configComponentsPlugin } from './components'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configImportPlugin } from './import'
import { configSvgIconsPlugin } from './svgSprite'

interface Options {
  isBuild: boolean
  root: string
  compress: string
  enableMock?: boolean
  enableAnalyze?: boolean
}

function createPlugins({ isBuild, compress }: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()]

  const appConfigPlugin = createAppConfigPlugin({ isBuild })
  vitePlugins.push(appConfigPlugin)

  // unocss
  vitePlugins.push(UnoCSS())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin({ isBuild }))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin({ isBuild }))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin({
        compress
      })
    )
  }

  // unplugin-auto-import
  vitePlugins.push(configImportPlugin())

  // unplugin-auto-components
  vitePlugins.push(configComponentsPlugin())

  return vitePlugins
}

export { createPlugins }
