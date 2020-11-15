import CloudKit from 'tsl-apple-cloudkit'
import { Record } from '.'
import { default as Field } from './FieldDecorator'

export default class WWDCYearInfo extends Record {
  static recordType = 'WWDCYearInfo'

  @Field public scholar!: CloudKit.Reference
  @Field public year!: CloudKit.Reference
  @Field public acceptanceEmail?: CloudKit.Asset
  @Field public appliedAs!: ('student' | 'stem' | 'both')
  @Field public description?: string
  @Field public status?: ('approved' | 'rejected' | 'pending')
  @Field public screenshots?: CloudKit.Asset[]
  @Field public githubLink?: string
  @Field public videoLink?: string
  @Field public appstoreLink?: string
  @Field public appType?: ('both' | 'offline' | 'online')
  @Field public reviewedAt?: number
  @Field public reviewedBy?: CloudKit.Reference
}
