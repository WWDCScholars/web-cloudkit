import { CloudKit, Record, Field } from '.'

export default class ScholarPrivate extends Record {
  static recordType = 'ScholarPrivate'

  @Field public birthday!: number
  @Field public email!: string
  @Field public scholar!: CloudKit.Reference
}
