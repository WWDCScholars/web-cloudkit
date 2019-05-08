import Vue from 'vue';
import { ck } from 'wwdcscholars-cloudkit';
export default function CloudKitPlugin({}, inject) {
    ck.configure({
        containerIdentifier: '<%= options.containerIdentifier %>',
        apiToken: '<%= options.apiToken %>',
        environment: '<%= options.environment %>'
    });
    Vue.$ck = ck;
    inject('ck', ck);
}
//# sourceMappingURL=nuxt-plugin.js.map