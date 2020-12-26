import CKClientConnection from '../core/CKClientConnection'
import Options from '../nuxt/nuxt-options'

declare module 'vue/types/vue' {
  // this.$ck inside Vue components
  interface Vue {
    $ck: CKClientConnection
  }
}

declare module '@nuxt/types' {
  // module configuration in nuxt.config.ts
  interface NuxtOptions {
    cloudKit?: Options
  }

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
