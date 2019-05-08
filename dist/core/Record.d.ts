import { CloudKit, Query } from '.';
declare module 'tsl-apple-cloudkit' {
    type RecordToCreateSimple = Pick<RecordToCreate, Exclude<keyof RecordToCreate, 'recordType'>>;
    type RecordFields = {
        [name: string]: RecordField;
    };
}
interface RecordBuilder<R> {
    recordType: string;
    new (): R;
    fromRecordReceived<T extends R>(this: RecordBuilder<T>, record: CloudKit.RecordReceived): T;
}
export declare type RecordFields = {
    [name: string]: CloudKit.RecordField;
};
export default class Record implements CloudKit.RecordLike {
    static recordType: string;
    created?: {
        timestamp: number;
        user: string;
    };
    modified?: {
        timestamp: number;
        user: string;
    };
    recordType: string;
    recordName: string;
    recordChangeTag?: string;
    deleted?: boolean;
    shortGUID?: string;
    parent?: CloudKit.Reference;
    share?: CloudKit.Reference;
    fields: RecordFields;
    updatedKeys: string[];
    constructor();
    static clone<T extends Record>(instance: T): T;
    static fromRecordReceived<T extends Record>(this: RecordBuilder<T>, record: CloudKit.RecordReceived): T;
    static fetch<T extends Record>(this: RecordBuilder<T>, recordName: string): Promise<T>;
    static query<T extends Record>(this: RecordBuilder<T>, query: Query, options?: CloudKit.RecordFetchOptions): Promise<T[]>;
    static create<T extends Record>(this: RecordBuilder<T>, record: CloudKit.RecordToCreateSimple): Promise<T>;
    delete(): Promise<void>;
    save(): Promise<void>;
    setFields(fields: object): void;
}
export {};
