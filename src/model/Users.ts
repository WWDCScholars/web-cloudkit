import { Users as _Users } from '../core'
import { Field, CloudKit } from '.'

export default class Users extends _Users {
  @Field public scholar?: CloudKit.Reference
}
