import { Record } from '.';
export default class WWDCYear extends Record {
    static recordType: string;
    name: string;
    year: string;
    challengeDescription?: string;
}
