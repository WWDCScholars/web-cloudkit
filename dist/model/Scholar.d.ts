import { CloudKit, Record } from '.';
export declare type Gender = ('male' | 'female' | 'other');
export default class Scholar extends Record {
    static recordType: string;
    givenName: string;
    familyName: string;
    gender: Gender;
    birthday?: number;
    location: CloudKit.Location;
    biography: string;
    profilePicture: CloudKit.Asset;
    scholarPrivate: CloudKit.Reference;
    socialMedia: CloudKit.Reference;
    wwdcYearInfos: CloudKit.Reference[];
    wwdcYears: CloudKit.Reference[];
    gdprConsentAt?: number;
}
