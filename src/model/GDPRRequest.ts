import {
  Record,
  Field,
  CloudKit
} from '.'

export default class GDPRRequest extends Record {
  static recordType = 'GDPRRequest'

  @Field public scholar!: CloudKit.Reference
  @Field public status!: ('fulfilled' | 'pending')
  @Field public fulfilledAt?: number
  @Field public type!: ('download')
}
