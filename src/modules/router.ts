import router from '~/router'

export const install: UserModule = ({ app }) => {
  app.use(router)
}
