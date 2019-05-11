import { Query } from 'tsl-apple-cloudkit'

declare module 'tsl-apple-cloudkit' {
  type QueryBase = Pick<Query, Exclude<keyof Query, 'recordType'>>

  type RecordToCreateBase = Pick<RecordToCreate, Exclude<keyof RecordToCreate, 'recordType'>>
  type RecordFields = { [name: string]: RecordField }
}
