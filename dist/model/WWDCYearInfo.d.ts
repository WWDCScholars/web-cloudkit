import { CloudKit, Record } from '.';
export default class WWDCYearInfo extends Record {
    static recordType: string;
    scholar: CloudKit.Reference;
    year: CloudKit.Reference;
    acceptanceEmail: CloudKit.Asset;
    appliedAs: ('student' | 'stem' | 'both');
    description?: string;
    screenshots?: CloudKit.Asset[];
    githubLink?: string;
    videoLink?: string;
    appstoreLink?: string;
    appType?: ('both' | 'offline' | 'online');
}
