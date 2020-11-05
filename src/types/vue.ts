import { CKClientConnection } from '@wwdcscholars/cloudkit'

declare module '@nuxt/vue-app' {
  interface Context {
    $ck: CKClientConnection
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue> {
    $ck: CKClientConnection
  }

  interface Vue {
    $ck: CKClientConnection
  }
}

declare module 'vuex' {
  interface Store<S> {
    $ck: CKClientConnection
  }
}
