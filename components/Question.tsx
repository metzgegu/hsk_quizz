import React from 'react'
import styles from './Question.module.scss'
import { Question as QuestionInterface } from '../models/question'
import { QuestionParameter } from '../models/questionParameter'
import { HskData } from '../models/hskData'

interface Props {
  question: QuestionInterface
  onSubmitResponse: (proposal: HskData) => void
  questionParameter: QuestionParameter
}

export default function Question({ question, onSubmitResponse, questionParameter }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        What does mean :
        <br />
        <b className={question.expected.hanzi.match(/[\u3400-\u9FBF]/) ? 'chinese' : ''}>
          {question.expected.hanzi}
        </b>
        {questionParameter.pinyin && <p>{question.expected.pinyin}</p>}
      </div>
      <div className={styles.proposals}>
        <ul>
          {question.proposals &&
            question.proposals.map((proposal, index) => (
              <li key={index}>
                <button
                  onClick={() => onSubmitResponse(proposal)}
                  className={proposal.incorrect ? styles.incorrect : ''}
                >
                  {proposal.translations[0]}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
