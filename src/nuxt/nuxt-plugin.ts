import { Plugin } from '@nuxt/types'
import { setup, CKClientConnection, CloudKit } from '@wwdcscholars/cloudkit'
// import CloudKit from 'tsl-apple-cloudkit'

declare module 'vue/types/vue' {
  // this.$ck inside Vue components
  interface Vue {
    $ck: CKClientConnection
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$ck inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $ck: CKClientConnection
  }

  // nuxtContext.$ck
  interface Context {
    $ck: CKClientConnection
  }
}

declare module 'vuex/types/index' {
  // this.$ck inside Vuex stores
  interface Store<S> {
    $ck: CKClientConnection
  }
}

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
