import React, { useState } from 'react'
import styles from './Parameter.module.scss'
import { QuestionParameter } from '../models/questionParameter'

interface Props {
  onSubmit: (param: QuestionParameter) => void
}

export default function Parameter({ onSubmit }: Props) {
  const [pinyin, setPinyin] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ pinyin })
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

      <button type="submit">GO</button>
    </form>
  )
}
