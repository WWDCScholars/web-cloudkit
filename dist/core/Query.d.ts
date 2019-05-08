import { CloudKit } from '.';
declare type Query = Pick<CloudKit.Query, Exclude<keyof CloudKit.Query, 'recordType'>>;
export default Query;
