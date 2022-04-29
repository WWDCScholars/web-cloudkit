import { Record } from '.'
import { default as Field } from './FieldDecorator'

export default class WWDCYear extends Record {
  static recordType = 'WWDCYear'

  @Field public name!: string
  @Field public year!: string
  @Field public challengeDescription?: string
  @Field public isHidden!: boolean
}
