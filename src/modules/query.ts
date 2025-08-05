import { VueQueryPlugin } from '@tanstack/vue-query'

export const install: UserModule = ({ app }) => {
  app.use(VueQueryPlugin)
}
