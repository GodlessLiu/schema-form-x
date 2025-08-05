// 打包时运行的插件
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import figletPlugin from './vite-plugin-figlet'

export default [
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
  }),
  // Gzip compression as fallback
  compression({
    algorithm: 'gzip',
    ext: '.gz',
    threshold: 10240, // Only compress files larger than 10KB
  }),
  figletPlugin({
    text: 'Hello',
    author: '@liuaifeng',
    url: 'https://github.com/GodlessLiu/schema-form-x/tree/base',
  },
  ),
]
