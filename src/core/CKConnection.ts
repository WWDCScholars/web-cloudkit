import CloudKit from 'tsl-apple-cloudkit'
import AuthTokenStore from './AuthTokenStore'
import { EventEmitter } from 'events'

export interface CloudKitConfig {
  containerIdentifier: string
  apiToken: string
  environment: 'development' | 'production'
}

export default class CKConnection extends EventEmitter {
  private instance!: CloudKit.CloudKit

  public constructor () {
    super()
  }

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

  public get defaultContainer(): CloudKit.Container {
    return this.instance.getDefaultContainer()
  }

  public get publicDatabase(): CloudKit.Database {
    return this.defaultContainer.getDatabaseWithDatabaseScope(CloudKit.DatabaseScope.PUBLIC)
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

  public async queryFromPublicDatabase(query: CloudKit.Query, options?: CloudKit.RecordFetchOptions): Promise<CloudKit.RecordReceived[]> {
    const response = await this.publicDatabase.performQuery(query, options)
    if (!response.records) {
      throw new Error('No results') // TODO: Remove
    }

    return response.records
  }

  public async createOrUpdateRecordInPublicDatabase(record: CloudKit.RecordToCreate | CloudKit.RecordToSave): Promise<CloudKit.RecordReceived> {
    const response = await this.publicDatabase.saveRecords([record])
    if (response.hasErrors) {
      throw response.errors[0]
    }
    return response.records[0]
  }

  public async deleteRecordFromPublicDatabase(record: string): Promise<void> {
    await this.publicDatabase.deleteRecords([record])
  }
}
