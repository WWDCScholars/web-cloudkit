import path from 'path';
export default function CloudKitModule(options) {
    if (!options.containerIdentifier) {
        throw new Error('[CloudKit] containerIdentifier missing');
    }
    if (!options.apiToken) {
        throw new Error('[CloudKit] apiToken missing');
    }
    if (!options.environment) {
        throw new Error('[CloudKit] environment missing');
    }
    this.addPlugin({
        src: path.resolve(__dirname, './nuxt-plugin.js'),
        options
    });
}
//# sourceMappingURL=nuxt-module.js.map