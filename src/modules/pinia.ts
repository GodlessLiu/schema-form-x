import { createPinia } from 'pinia'

export const install: UserModule = ({ app }) => {
  app.use(createPinia())
}
