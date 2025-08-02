import { createApp } from 'vue'

import App from './App.vue'

import { autoRefresh } from './lib/auto-update'
import '~/styles/tailwind.css'

function init() {
  const app = createApp(App)
  // Enable auto-update check in production environment
  if (import.meta.env.MODE === 'production') {
    autoRefresh()
  }
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.({ app }))
  app.mount('#app')
}

init()
