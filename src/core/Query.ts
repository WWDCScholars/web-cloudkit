import { CloudKit } from '.'

type Query = Pick<CloudKit.Query, Exclude<keyof CloudKit.Query, 'recordType'>>
export default Query
