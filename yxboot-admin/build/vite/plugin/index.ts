import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'

import purgeIcons from 'vite-plugin-purge-icons'
import windiCSS from 'vite-plugin-windicss'

import { configComponentsPlugin } from './components'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configImportPlugin } from './import'
import { configSvgIconsPlugin } from './svgSprite'
import { configThemePlugin } from './theme'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    vueJsx()
  ]

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())

  // unplugin-auto-import
  vitePlugins.push(configImportPlugin())

  // unplugin-auto-components
  vitePlugins.push(configComponentsPlugin())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild))

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
  }

  return vitePlugins
}
