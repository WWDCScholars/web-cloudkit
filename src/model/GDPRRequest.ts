import CloudKit from 'tsl-apple-cloudkit'
import { Record } from '.'
import Field from './FieldDecorator'

export default class GDPRRequest extends Record {
  static recordType = 'GDPRRequest'

  @Field public scholar!: CloudKit.Reference
  @Field public status!: ('fulfilled' | 'pending')
  @Field public fulfilledAt?: number
  @Field public type!: ('download')
}
