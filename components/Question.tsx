import React from 'react'
import styles from './Question.module.scss'
import { Question as QuestionInterface } from '../models/question'
import { QuestionParameter } from '../models/questionParameter'
import { HskData } from '../models/hskData'
import { QuestionTypes } from '../utils/helper'

interface Props {
  question: QuestionInterface
  onSubmitResponse: (proposal: HskData) => void
  questionParameter: QuestionParameter
}

export default function Question({
  question,
  onSubmitResponse,
  questionParameter,
}: Props): JSX.Element {
  const questionLabel =
    questionParameter.questionType === QuestionTypes.HANZI_TO_TRANSLATIONS
      ? question.expected.hanzi
      : question.expected.translations[0]

  const getProposalLabel = (proposal: HskData): string => {
    return questionParameter.questionType === QuestionTypes.HANZI_TO_TRANSLATIONS
      ? proposal.translations[0]
      : proposal.hanzi
  }

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        What does mean :
        <br />
        <br />
        <b className={questionLabel.match(/[\u3400-\u9FBF]/) ? styles.chinese : ''}>
          {questionLabel}
        </b>
        {questionParameter.pinyin &&
          questionParameter.questionType === QuestionTypes.HANZI_TO_TRANSLATIONS && (
            <p>{question.expected.pinyin}</p>
          )}
      </div>
      <div className={styles.proposals}>
        <ul>
          {question.proposals &&
            question.proposals.map((proposal) => (
              <li key={proposal.id}>
                <button
                  onClick={() => onSubmitResponse(proposal)}
                  className={proposal.incorrect ? styles.incorrect : ''}
                >
                  <span
                    className={
                      getProposalLabel(proposal).match(/[\u3400-\u9FBF]/) ? styles.chinese : ''
                    }
                  >
                    {getProposalLabel(proposal)}
                  </span>
                  {questionParameter.pinyin &&
                    questionParameter.questionType === QuestionTypes.TRANSLATIONS_TO_HANZI && (
                      <p>{proposal.pinyin}</p>
                    )}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
