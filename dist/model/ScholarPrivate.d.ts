import { CloudKit, Record } from '.';
export default class ScholarPrivate extends Record {
    static recordType: string;
    birthday: number;
    email: string;
    scholar?: CloudKit.Reference;
}
