import { CloudKit, Record, Field } from '.'

export default class ScholarSocialMedia extends Record {
  static recordType = 'ScholarSocialMedia'
  
  @Field public scholar!: CloudKit.Reference
  @Field public discord!: string
  @Field public facebook!: string
  @Field public github!: string
  @Field public imessage!: string
  @Field public itunes!: string
  @Field public linkedin!: string
  @Field public twitter!: string
  @Field public website!: string
}
