import Vue from 'vue'
import { CKConnection } from '@wwdcscholars/cloudkit'

declare module '@nuxt/vue-app' {
  interface Context {
    $ck: CKConnection
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue> {
    $ck: CKConnection
  }

  interface Vue {
    $ck: CKConnection
  }
}

declare module 'vuex' {
  interface Store<S> {
    $ck: CKConnection
  }
}
