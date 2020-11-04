import CloudKit from 'tsl-apple-cloudkit'
import CKConnection from './CKConnection'
import AuthTokenStore from './AuthTokenStore'

export interface CloudKitConfig {
  containerIdentifier: string
  apiToken: string
  environment: 'development' | 'production'
}

export default class CKClientConnection extends CKConnection {
  public configure(config: CloudKitConfig) {
    this.instance = CloudKit.configure({
      containers: [{
        containerIdentifier: config.containerIdentifier,
        apiTokenAuth: {
          apiToken: config.apiToken,
          persist: true
        },
        environment: config.environment
      }],
      services: {
        authTokenStore: new AuthTokenStore()
      }
    } as any)
  }

  public get defaultAuth(): any {
    return this.defaultContainer['_auth']
  }

  public async setUpAuth(): Promise<CloudKit.UserIdentity | undefined> {
    const userIdentity = await this.defaultContainer.setUpAuth()

    if (userIdentity) {
      this.gotoAuthenticatedState(userIdentity)
      return userIdentity
    }

    this.gotoUnauthenticatedState()
  }

  public async signOut(): Promise<void> {
    this.defaultAuth._setSession(null)
    await this.defaultAuth._fetchAndHandleCurrentUserIdentity()
    this.defaultAuth.signOut()
  }

  private gotoAuthenticatedState(userIdentity: CloudKit.UserIdentity) {
    this.emit('authenticated', userIdentity)

    return this.defaultContainer
      .whenUserSignsOut()
      .then(this.gotoUnauthenticatedState.bind(this))
  }

  private gotoUnauthenticatedState(error?: CloudKit.CKError) {
    if (error) console.warn(error) // FIXME: remove
    this.emit('unauthenticated', this.defaultContainer)

    return this.defaultContainer
      .whenUserSignsIn()
      .then(this.gotoAuthenticatedState.bind(this))
  }

  public async fetchFromPublicDatabase(recordName: string): Promise<CloudKit.RecordReceived> {
    const response = await this.publicDatabase.fetchRecords([recordName])
    if (!response.records || !response.records[0]) {
      throw new Error(`Empty response when fetching record: ${recordName}`)
    }

    return response.records[0]
  }
}
