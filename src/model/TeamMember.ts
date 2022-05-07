import CloudKit from 'tsl-apple-cloudkit'
import { Record } from '.'
import Field from './FieldDecorator'

export default class TeamMember extends Record {
  static recordType = 'TeamMember'

  @Field public name!: string
  @Field public birthday!: number
  @Field public biography!: string
  @Field public picture!: CloudKit.Asset
  @Field public scholar?: CloudKit.Reference
}
