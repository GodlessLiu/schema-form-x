import { createApp } from 'vue'

import App from './App.vue'

import { autoRefresh } from './utils/auto-update'
import '~/styles/tailwind.css'

function init() {
  const app = createApp(App)
  // 生产环境开启自动更新检查
  if (import.meta.env.MODE === 'production') {
    autoRefresh()
  }
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.({ app }))
  app.mount('#app')
}

init()
