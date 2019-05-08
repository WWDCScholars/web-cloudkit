import merge from 'lodash.merge'
import { ck, CloudKit, Query } from '.'

declare module 'tsl-apple-cloudkit' {
  type RecordToCreateSimple = Pick<RecordToCreate, Exclude<keyof RecordToCreate, 'recordType'>>
  type RecordFields = { [name: string]: RecordField }
}

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

  public static clone<T extends Record>(instance: T): T {
    const copy = new (instance.constructor as { new(): T })()
    merge(copy, instance)
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
    recordName: string
  ): Promise<T> {
    const record = await ck.fetchFromPublicDatabase(recordName)
    return this.fromRecordReceived(record)
  }

  public static async query<T extends Record>(
    this: RecordBuilder<T>,
    query: Query,
    options?: CloudKit.RecordFetchOptions
  ): Promise<T[]> {
    const records = await ck.queryFromPublicDatabase({
      ...query,
      recordType: this.recordType
    }, options)
    return records.map(record => this.fromRecordReceived(record))
  }

  public static async create<T extends Record>(
    this: RecordBuilder<T>,
    record: CloudKit.RecordToCreateSimple
  ): Promise<T> {
    const recordToCreate: CloudKit.RecordToCreate = {
      recordType: this.recordType,
      ...record
    }
    const createdRecord = await ck.createOrUpdateRecordInPublicDatabase(recordToCreate)
    return this.fromRecordReceived(createdRecord)
  }

  public async delete(): Promise<void> {
    await ck.deleteRecordFromPublicDatabase(this.recordName)
  }

  public async save(): Promise<void> {
    if (!this.recordName || !this.recordChangeTag) {
      throw new Error('Cannot save Record without recordName or recordChangeTag')
    }

    const Type = <typeof Record>this.constructor
    const recordToSave: CloudKit.RecordToSave = {
      recordType: Type.recordType,
      recordName: this.recordName,
      recordChangeTag: this.recordChangeTag,
      fields: {}
    }

    // insert updated fields
    for (const key of this.updatedKeys) {
      recordToSave.fields[key] = this.fields[key]
    }

    // save record
    const savedRecord = await ck.createOrUpdateRecordInPublicDatabase(recordToSave)

    // update this with new record change tag
    this.recordChangeTag = savedRecord.recordChangeTag
  }

  public setFields(fields: object) {
    for (const key in fields) {
      this.fields[key] = fields[key]
      this.updatedKeys.push(key)
    }
  }

}
