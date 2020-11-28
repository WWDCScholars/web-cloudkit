import { Module } from '@nuxt/types'
import path from 'path'
import { CloudKit } from '..'

interface Options {
  containerIdentifier: string
  apiToken: string
  environment: string
}

const CloudKitModule: Module<Options> = function (moduleOptions) {
  if (!moduleOptions.containerIdentifier) {
    throw new Error('[CloudKit] containerIdentifier missing')
  }

  if (!moduleOptions.apiToken) {
    throw new Error('[CloudKit] apiToken missing')
  }

  if (!moduleOptions.environment) {
    throw new Error('[CloudKit] environment missing')
  }

  this.addPlugin({
    src: path.resolve(__dirname, './nuxt-plugin.js'),
    options: moduleOptions
  })
}

export default CloudKitModule

export const meta = require('../../../package.json')
