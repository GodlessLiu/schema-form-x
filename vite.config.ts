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
        chunkFileNames: (chunkInfo) => {
          // 为手动分包的文件使用有意义的名称
          if (chunkInfo.name && ['vue-vendor', 'ui-vendor', 'utils-vendor', 'i18n-vendor', 'vendor'].includes(chunkInfo.name)) {
            return `js/${chunkInfo.name}.js`
          }
          // 其他文件使用哈希值
          return 'js/[hash].js'
        },
        entryFileNames: 'js/[hash].js',
        assetFileNames: '[ext]/[hash].[ext]',
        manualChunks: (id) => {
          // Vue相关库
          if (id.includes('node_modules/vue')
            || id.includes('node_modules/vue-router')
            || id.includes('node_modules/pinia')) {
            return 'vue-vendor'
          }
          // UI组件库
          if (id.includes('node_modules/lucide-vue-next')
            || id.includes('node_modules/vue-sonner')) {
            return 'ui-vendor'
          }
          // 工具库
          if (id.includes('node_modules/@vueuse')
            || id.includes('node_modules/nprogress')) {
            return 'utils-vendor'
          }
          // 国际化
          if (id.includes('node_modules/vue-i18n')) {
            return 'i18n-vendor'
          }
          // 其他第三方库
          if (id.includes('node_modules/')) {
            return 'vendor'
          }
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
  },
})
