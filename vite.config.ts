import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import buildCodePlugins from './vitePlugin/build-code-plugins'
import devCodePlugins from './vitePlugin/dev-code-plugins'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    ...devCodePlugins,
    ...buildCodePlugins,
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', '@vueuse/core', 'lodash'],
        },
      },
    },
    // 优化分包大小
    chunkSizeWarningLimit: 1000,
    // 启用源码映射（生产环境可关闭）
    sourcemap: false,
  },
  server: {
    host: true,
    open: true,
    proxy: {
      '/aliyun-api': {
        target: 'https://dashscope.aliyuncs.com/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/aliyun-api/, ''),
      },
    },
  },
})
