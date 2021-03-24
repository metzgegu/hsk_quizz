import React, { useState } from 'react'
import styles from './Parameter.module.scss'
import { QuestionParameter } from '../models/questionParameter'
import { QuestionTypes } from '../utils/helper'

interface Props {
  onSubmit: (param: QuestionParameter) => void
}

export default function Parameter({ onSubmit }: Props) {
  const [pinyin, setPinyin] = useState(false)
  const [numberOfProposal, setNumberOfProposal] = useState(4)
  const [questionType, setQuestionType] = useState(QuestionTypes.HANZI_TO_TRANSLATIONS)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ pinyin, numberOfProposal, questionType })
  }

  const handleChangeQuestionType = (event) => {
    event.preventDefault()
    console.log(questionType)
    setQuestionType(
      questionType === QuestionTypes.TRANSLATIONS_TO_HANZI
        ? QuestionTypes.HANZI_TO_TRANSLATIONS
        : QuestionTypes.TRANSLATIONS_TO_HANZI
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4>Preferences</h4>

      <div className={styles.formCheck}>
        <input
          type="checkbox"
          name="pinyin"
          id="pinyin"
          checked={pinyin}
          onChange={(e) => setPinyin(e.target.checked)}
        />
        <label htmlFor="pinyin">Display pinyin</label>
      </div>

      <div className={styles.formNumberOfProposal}>
        <input
          type="number"
          name="numberOfProposal"
          id="numberOfProposal"
          value={numberOfProposal}
          min="1"
          max="10"
          onChange={(e) => setNumberOfProposal(parseInt(e.target.value))}
        />
        <label htmlFor="numberOfProposal">Number of proposal</label>
      </div>

      <div
        className={`${styles.formQuestionType} ${
          questionType === QuestionTypes.TRANSLATIONS_TO_HANZI ? styles.reverse : ''
        }`}
      >
        <div>Chinese</div>
        <div className={styles.formQuestionTypeButton}>
          <button onClick={handleChangeQuestionType}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M508.979 147.084L398.046 53.217a8.542 8.542 0 00-9.105-1.229A8.55 8.55 0 00384 59.736v68.267H25.6c-14.114 0-25.6 11.486-25.6 25.6s11.486 25.6 25.6 25.6H384v68.267a8.53 8.53 0 004.941 7.74 8.455 8.455 0 003.593.794c1.98 0 3.942-.691 5.513-2.014l110.933-93.867a8.547 8.547 0 00-.001-13.039zM384 162.136H25.6c-4.702 0-8.533-3.823-8.533-8.533s3.831-8.533 8.533-8.533H384v17.066zm17.067 66.936V78.134l89.19 75.469-89.19 75.469zM486.4 332.803H128v-68.267a8.53 8.53 0 00-14.046-6.511L3.021 351.892C1.101 353.513 0 355.894 0 358.403s1.101 4.89 3.021 6.519l110.933 93.867a8.56 8.56 0 005.513 2.014c1.22 0 2.441-.256 3.593-.794a8.529 8.529 0 004.941-7.74v-68.267h358.4c14.114 0 25.6-11.486 25.6-25.6-.001-14.113-11.487-25.599-25.601-25.599zM110.933 433.872l-89.19-75.469 89.19-75.469v150.938zM486.4 366.936H128V349.87h358.4c4.702 0 8.533 3.823 8.533 8.533 0 4.71-3.831 8.533-8.533 8.533z" />
            </svg>
          </button>
        </div>
        <div>English</div>
      </div>

      <button type="submit">GO</button>
    </form>
  )
}
