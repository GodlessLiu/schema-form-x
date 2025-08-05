// 有利于开发代码相关的vite插件
import path from 'node:path'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import tailwindcss from '@tailwindcss/vite'

import { unheadVueComposablesImports } from '@unhead/vue'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default [
  vue(),
  tailwindcss(),
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
    include: [path.resolve(__dirname, '../', 'locales/**')],
  }),
  vueDevTools(),
]
