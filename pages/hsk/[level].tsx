import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getHskData } from '../../utils/actions.async'
import { shuffleArray } from '../../utils/helper'
import Question from '../../components/Question'
import styles from '../../styles/Home.module.scss'
import Parameter from '../../components/Parameter'
import { QuestionParameter } from '../../models/questionParameter'
import { HskData } from '../../models/hskData'
import { Result } from '../../models/result'

export default function Hsk() {
  const router = useRouter()
  const { level } = router.query
  const [hskData, setHskData] = useState(undefined)
  const [currentQuestion, setCurrentQuestion] = useState(undefined)
  const [questionParameter, setQuestionParameter] = useState<QuestionParameter | undefined>(
    undefined
  )
  const [currentResult, setCurrentResult] = useState<Result>({ responseTotal: 0, correctAnswer: 0 })

  const getRandomInt = (max, forbiddenInt) => {
    const randomId = Math.floor(Math.random() * Math.floor(max))
    if (forbiddenInt === randomId) {
      return getRandomInt(max, forbiddenInt)
    } else {
      return randomId
    }
  }

  const handleSubmitResponse = (proposal: HskData) => {
    if (currentQuestion.expected.id === proposal.id) {
      setCurrentResult({
        responseTotal: currentResult.responseTotal + 1,
        correctAnswer: currentResult.correctAnswer + 1,
      })
      if (currentQuestion.index < hskData.length)
        setCurrentQuestion({
          index: currentQuestion.index + 1,
          expected: hskData[currentQuestion.index + 1],
          proposals: getRandomProposal(
            currentQuestion.index + 1,
            hskData.length,
            questionParameter
          ).map((key) => hskData[key]),
        })
    } else {
      setCurrentResult({ ...currentResult, responseTotal: currentResult.responseTotal + 1 })
      setCurrentQuestion({
        ...currentQuestion,
        proposals: currentQuestion.proposals.map((p) =>
          p.id === proposal.id ? { ...p, incorrect: true } : p
        ),
      })
    }
  }

  function getRandomProposal(currentQuestion: number, size: number, paramater: QuestionParameter) {
    const proposals = [
      currentQuestion,
      ...new Array(paramater.numberOfProposal - 1)
        .fill(undefined)
        .map(() => getRandomInt(size - 1, currentQuestion)),
    ]
    return shuffleArray(proposals)
  }

  function handleParameterSubmit(parameters: QuestionParameter) {
    setQuestionParameter(parameters)
    setCurrentQuestion({
      index: 0,
      expected: hskData[0],
      proposals: getRandomProposal(0, hskData.length, parameters).map((key) => hskData[key]),
    })
  }

  useEffect(() => {
    if (!hskData && level) {
      getHskData(level).then((hsk) => setHskData(shuffleArray(hsk)))
    }
  })

  return (
    <div className={styles.container}>
      {level && <h1>Hsk {level}</h1>}
      {currentQuestion && hskData && (
        <>
          <Question
            question={currentQuestion}
            onSubmitResponse={handleSubmitResponse}
            questionParameter={questionParameter}
          ></Question>
          <div className={styles.result}>
            {currentResult.correctAnswer} / {currentResult.responseTotal}
          </div>
        </>
      )}
      {!currentQuestion && <Parameter onSubmit={handleParameterSubmit} />}
    </div>
  )
}
