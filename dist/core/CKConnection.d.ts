/// <reference types="@types/node" />
import CloudKit from 'tsl-apple-cloudkit';
import { EventEmitter } from 'events';
export interface CloudKitConfig {
    containerIdentifier: string;
    apiToken: string;
    environment: 'development' | 'production';
}
export default class CKConnection extends EventEmitter {
    private instance;
    constructor();
    configure(config: CloudKitConfig): void;
    readonly defaultContainer: CloudKit.Container;
    readonly publicDatabase: CloudKit.Database;
    readonly defaultAuth: any;
    setUpAuth(): Promise<CloudKit.UserIdentity | undefined>;
    signOut(): Promise<void>;
    private gotoAuthenticatedState;
    private gotoUnauthenticatedState;
    fetchFromPublicDatabase(recordName: string): Promise<CloudKit.RecordReceived>;
    queryFromPublicDatabase(query: CloudKit.Query, options?: CloudKit.RecordFetchOptions): Promise<CloudKit.RecordReceived[]>;
    createOrUpdateRecordInPublicDatabase(record: CloudKit.RecordToCreate | CloudKit.RecordToSave): Promise<CloudKit.RecordReceived>;
    deleteRecordFromPublicDatabase(record: string): Promise<void>;
}
