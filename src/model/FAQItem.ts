import { Record } from '.'
import Field from './FieldDecorator'

export default class FAQItem extends Record {
  static recordType = 'FAQItem'

  @Field public index!: number
  @Field('question_en') public question!: string
  @Field('answer_en') public answer!: string
  @Field('comment_en') public comment?: string
}
