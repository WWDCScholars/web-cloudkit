import { Query } from 'tsl-apple-cloudkit'

declare module 'tsl-apple-cloudkit' {
  type QueryBase = Pick<Query, Exclude<keyof Query, 'recordType'>>
}
