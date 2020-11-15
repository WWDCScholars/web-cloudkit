import CloudKit from 'tsl-apple-cloudkit'
import { Record } from '.'
import { default as Field } from './FieldDecorator'

export default class Users extends Record {
  static recordType = 'Users'
  @Field public scholar?: CloudKit.Reference
}
