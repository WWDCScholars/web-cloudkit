import fetch from 'node-fetch'
import CloudKit from 'tsl-apple-cloudkit'
import CKConnection from './CKConnection'

export default class CKServerConnection extends CKConnection {
  public constructor(config: CloudKit.ServerContainerConfig, log: boolean = true) {
    super()

    this.instance = CloudKit.configure({
      containers: [config],
      services: {
        fetch: fetch,
        logger: log ? console : undefined
      }
    })
  }

  public async setUpAuth(): Promise<CloudKit.UserIdentity | null> {
    return this.defaultContainer.setUpAuth()
  }
}
