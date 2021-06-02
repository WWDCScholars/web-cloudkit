import CloudKit from 'tsl-apple-cloudkit'
import { Record } from '.'
import { default as Field } from './FieldDecorator'

export default class ScholarSocialMedia extends Record {
  static recordType = 'ScholarSocialMedia'

  @Field public scholar!: CloudKit.Reference
  @Field public discord!: string
  @Field public facebook!: string
  @Field public github!: string
  @Field public imessage!: string
  @Field public instagram!: string
  @Field public itunes!: string
  @Field public linkedin!: string
  @Field public twitter!: string
  @Field public website!: string
}
