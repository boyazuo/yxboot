import dayjs from 'dayjs'
import { resolve } from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'

import { OUTPUT_DIR } from './build/constant'
import { generateModifyVars } from './build/generate/generateModifyVars'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy'
import pkg from './package.json'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        },
        {
          find: /#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US'
      ]
    }
  }
}
