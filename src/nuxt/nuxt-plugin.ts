import { Plugin } from '@nuxt/types'
import { setup, CloudKit } from '@wwdcscholars/cloudkit'

const CloudKitPlugin: Plugin = (context, inject) => {
  const config = {
    containerIdentifier: '<%= options.containerIdentifier %>',
    apiTokenAuth: {
      apiToken: '<%= options.apiToken %>'
    },
    environment: '<%= options.environment %>'
  }

  const connection = setup(config as CloudKit.ClientContainerConfig)
  inject('ck', connection)
}

export default CloudKitPlugin
