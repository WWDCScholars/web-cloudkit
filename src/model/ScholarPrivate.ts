import CloudKit from 'tsl-apple-cloudkit'
import { Record } from '.'
import { default as Field } from './FieldDecorator'

export default class ScholarPrivate extends Record {
  static recordType = 'ScholarPrivate'

  @Field public birthday!: number
  @Field public email!: string
  @Field public scholar!: CloudKit.Reference
}
