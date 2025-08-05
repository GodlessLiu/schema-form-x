import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import tailwindcss from '@tailwindcss/vite'

import { unheadVueComposablesImports } from '@unhead/vue'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
      ],
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core', unheadVueComposablesImports],
      dts: 'typings/auto-imports.d.ts',

    }),
    Components({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
      ],
      dts: 'typings/components.d.ts',
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SchemaFormX',
        short_name: 'SchemaFormX',
        description: 'SchemaFormX',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
    // Gzip compression as fallback
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
    }),
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
