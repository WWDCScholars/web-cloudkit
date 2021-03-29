import { Plugin } from '@nuxt/types'
import { setup, CloudKit } from '@wwdcscholars/cloudkit'

const CloudKitPlugin: Plugin = (context, inject) => {
  const containerConfig = {
    containerIdentifier: '<%= options.container.containerIdentifier %>',
    apiTokenAuth: {
      apiToken: '<%= options.container.apiToken %>'
    },
    environment: '<%= options.container.environment %>'
  }

  const tokenExpires = '<%= options.authTokenStore.expires %>'
  const tokenSecure = '<%= options.authTokenStore.secure %>'
  const authTokenStoreOptions = {
    expires: tokenExpires.length > 0 ? parseInt(tokenExpires) : undefined,
    secure: tokenSecure.length > 0 ? tokenSecure as any === 'true' : undefined
  }

  const connection = setup(containerConfig as CloudKit.ClientContainerConfig, authTokenStoreOptions)
  inject('ck', connection)
}

export default CloudKitPlugin
