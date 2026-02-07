import { defineConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export interface ViteConfigOptions {
  port?: number;
  proxy?: Record<string, any>;
  base?: string;
}

export function createViteConfig(options: ViteConfigOptions = {}): UserConfig {
  const { port = 5173, proxy, base = '/' } = options;

  return defineConfig({
    base,
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': '/src',
        '@core': '../../packages/@core/src',
      },
    },
    server: {
      port,
      host: true,
      proxy,
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'axios'],
    },
  });
}
