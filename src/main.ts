import { createApp } from 'vue'

import App from './App.vue'

import '~/components/basic/forms/validate'

import '~/styles/tailwind.css'

function init() {
  const app = createApp(App)

  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.({ app }))
  app.mount('#app')
}

init()
