import CloudKit from 'tsl-apple-cloudkit'
import CKConnection from './CKConnection'

export default class CKServerConnection extends CKConnection {
  public constructor(config: CloudKit.ServerContainerConfig) {
    super()

    this.instance = CloudKit.configure({
      containers: [config]
    })
  }

  public async setupAuth(): Promise<CloudKit.UserIdentity | null> {
    return this.defaultContainer.setUpAuth()
  }
}
