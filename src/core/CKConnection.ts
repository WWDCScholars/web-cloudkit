import CloudKit from 'tsl-apple-cloudkit'
import { EventEmitter } from 'events'

export default class CKConnection extends EventEmitter {
  protected instance!: CloudKit.CloudKit

  public constructor () {
    super()
  }

  public get defaultContainer(): CloudKit.Container {
    return this.instance.getDefaultContainer()
  }

  public get publicDatabase(): CloudKit.Database {
    return this.defaultContainer.getDatabaseWithDatabaseScope(CloudKit.DatabaseScope.PUBLIC)
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
      return []
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
