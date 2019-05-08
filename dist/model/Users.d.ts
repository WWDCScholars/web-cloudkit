import { Users as _Users } from '../core';
import { CloudKit } from '.';
export default class Users extends _Users {
    scholar?: CloudKit.Reference;
}
