import path from 'path'
import defu from 'defu'
import { Module } from '@nuxt/types'
import Options from './nuxt-options'

const defaultOptions: Options = {
  containerIdentifier: undefined,
  apiToken: undefined,
  environment: undefined
}

const CloudKitModule: Module<Options> = function (moduleOptions) {
  const options = defu({
    ...this.options.cloudKit,
    ...moduleOptions
  }, defaultOptions)

  if (!options.containerIdentifier) {
    throw new Error('[CloudKit] containerIdentifier missing')
  }

  if (!options.apiToken) {
    throw new Error('[CloudKit] apiToken missing')
  }

  if (!options.environment) {
    throw new Error('[CloudKit] environment missing')
  }

  this.addPlugin({
    src: path.resolve(__dirname, './nuxt-plugin.js'),
    mode: 'client',
    ssr: false,
    fileName: 'wwdcscholars-cloudkit.client.js',
    options
  })
}

export default CloudKitModule

export const meta = require('../../../package.json')
