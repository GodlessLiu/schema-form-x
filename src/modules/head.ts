import { createHead } from '@unhead/vue/client'

export const install: UserModule = ({ app }) => {
  app.use(createHead())
}
