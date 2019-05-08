import { Record, Field } from '.'

export default class WWDCYear extends Record {
  static recordType = 'WWDCYear'

  @Field public name!: string
  @Field public year!: string
  @Field public challengeDescription?: string
}
