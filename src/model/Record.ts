import CloudKit from 'tsl-apple-cloudkit'
import merge from 'lodash.merge'
import CKConnection from '../core/CKConnection'
import { connection as globalConnection } from '../core/connectionInstance'

interface RecordBuilder<R> {
  recordType: string
  new(): R
  fromRecordReceived<T extends R>(this: RecordBuilder<T>, record: CloudKit.RecordReceived): T
}

export type RecordFields = { [name: string]: CloudKit.RecordField }

export default class Record implements CloudKit.RecordLike {
  static recordType: string

  created?: { timestamp: number; user: string; }
  modified?: { timestamp: number; user: string; }
  recordType!: string
  recordName!: string
  recordChangeTag?: string
  deleted?: boolean
  shortGUID?: string
  parent?: CloudKit.Reference
  share?: CloudKit.Reference
  fields: RecordFields = {}

  updatedKeys: string[] = []

  constructor() {}

  public static clone<T extends Record>(instance: T, setUpdatedKeys: boolean = false): T {
    const copy = new (instance.constructor as { new(): T })()
    merge(copy, instance)

    if (setUpdatedKeys === true) {
      copy.updatedKeys = Object.keys(copy.fields)
    }

    return copy
  }

  public static fromRecordReceived<T extends Record>(
    this: RecordBuilder<T>,
    record: CloudKit.RecordReceived
  ): T {
    const t = new this()

    t.created = record.created
    t.modified = record.modified
    t.recordType = record.recordType
    t.recordName = record.recordName
    t.recordChangeTag = record.recordChangeTag
    t.deleted = record.deleted
    t.shortGUID = record.shortGUID
    t.parent = record.parent
    t.share = record.share
    t.fields = record.fields as RecordFields

    return t
  }

  public static async fetch<T extends Record>(
    this: RecordBuilder<T>,
    recordName: string,
    connection: CKConnection = globalConnection
  ): Promise<T> {
    Record.checkConnection(connection)

    const record = await connection.fetchFromPublicDatabase(recordName)
    return this.fromRecordReceived(record)
  }

  public static async query<T extends Record>(
    this: RecordBuilder<T>,
    query: CloudKit.QueryBase,
    options?: CloudKit.RecordFetchOptions,
    connection: CKConnection = globalConnection
  ): Promise<T[]> {
    Record.checkConnection(connection)

    const records = await connection.queryFromPublicDatabase({
      ...query,
      recordType: this.recordType
    }, options)
    return records.map(record => this.fromRecordReceived(record))
  }

  public static async create<T extends Record>(
    this: RecordBuilder<T>,
    record: CloudKit.RecordToCreateBase,
    connection: CKConnection = globalConnection
  ): Promise<T> {
    Record.checkConnection(connection)

    const recordToCreate: CloudKit.RecordToCreate = {
      recordType: this.recordType,
      ...record
    }
    const createdRecord = await connection.createOrUpdateRecordInPublicDatabase(recordToCreate)
    return this.fromRecordReceived(createdRecord)
  }

  public async delete(connection: CKConnection = globalConnection): Promise<void> {
    Record.checkConnection(connection)

    await connection.deleteRecordFromPublicDatabase(this.recordName)
  }

  public get recordToSave(): CloudKit.RecordToSave {
    if (!this.recordName || !this.recordChangeTag) {
      throw new Error('Cannot get recordToSave without recordName or recordChangeTag')
    }

    const Type = <typeof Record>this.constructor
    const recordToSave: CloudKit.RecordToSave = {
      recordType: Type.recordType,
      recordName: this.recordName,
      recordChangeTag: this.recordChangeTag,
      fields: {}
    }

    for (const key of this.updatedKeys) {
      (recordToSave.fields as RecordFields)[key] = this.fields[key]
    }

    return recordToSave
  }

  public async save(connection: CKConnection = globalConnection): Promise<void> {
    Record.checkConnection(connection)

    // save record
    const savedRecord = await connection.createOrUpdateRecordInPublicDatabase(this.recordToSave)

    // update this with new record change tag
    this.recordChangeTag = savedRecord.recordChangeTag
  }

  public setFields(fields: RecordFields) {
    for (const key in fields) {
      this.fields[key] = fields[key]
      this.updatedKeys.push(key)
    }
  }

  private static checkConnection(connection: CKConnection = globalConnection) {
    if (!connection) {
      throw new Error('CloudKit not initialized; use the setup function')
    }
  }
}
