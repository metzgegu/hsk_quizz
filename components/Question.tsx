import React from 'react'
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
    <div className="items-center min-h-40 min-w-40 ">
      <div className="text-center">
        What does mean :
        <br />
        <br />
        <b className={questionLabel.match(/[\u3400-\u9FBF]/) ? 'chinese' : ''}>{questionLabel}</b>
        {questionParameter.pinyin &&
          questionParameter.questionType === QuestionTypes.HANZI_TO_TRANSLATIONS && (
            <p className="font-bold">{question.expected.pinyin}</p>
          )}
      </div>
      <div className="justify-center flex-row w-full">
        <ul className="list-none w-full p-0">
          {question.proposals &&
            question.proposals.map((proposal) => (
              <li key={proposal.id} className="my-2.5 mx-0 w-full">
                <button
                  onClick={() => onSubmitResponse(proposal)}
                  className={proposal.incorrect ? 'incorrect' : ''}
                >
                  <span
                    className={getProposalLabel(proposal).match(/[\u3400-\u9FBF]/) ? 'chinese' : ''}
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
