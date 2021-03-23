import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>HSK Quizz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>HSK Quizz Test</h1>

        <p className={styles.description}>Choose your level :</p>

        <div className={styles.links}>
          <button onClick={() => router.push('hsk/1')}>HSK 1</button>
          <button onClick={() => router.push('hsk/2')}>HSK 2</button>
          <button onClick={() => router.push('hsk/3')}>HSK 3</button>
          <button onClick={() => router.push('hsk/4')}>HSK 4</button>
          <button onClick={() => router.push('hsk/6')}>HSK 5</button>
          <button onClick={() => router.push('hsk/6')}>HSK 6</button>
        </div>
      </main>
    </div>
  )
}
