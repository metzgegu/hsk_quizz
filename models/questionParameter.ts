import { QuestionTypes } from '../utils/helper'

export interface QuestionParameter {
  pinyin: boolean
  numberOfProposal: number
  questionType: QuestionTypes
}
