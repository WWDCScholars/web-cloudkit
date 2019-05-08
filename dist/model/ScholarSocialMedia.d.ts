import { CloudKit, Record } from '.';
export default class ScholarSocialMedia extends Record {
    static recordType: string;
    scholar: CloudKit.Reference;
    discord: string;
    facebook: string;
    github: string;
    imessage: string;
    itunes: string;
    linkedin: string;
    twitter: string;
    website: string;
}
