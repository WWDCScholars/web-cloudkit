import Vue from 'vue'
import { ck } from '@wwdcscholars/cloudkit'

export default function CloudKitPlugin({}, inject: any) {
  ck.configure({
    containerIdentifier: '<%= options.containerIdentifier %>',
    apiToken: '<%= options.apiToken %>',
    environment: '<%= options.environment %>' as 'development' | 'production'
  })

  Vue.$ck = ck
  inject('ck', ck)
}
