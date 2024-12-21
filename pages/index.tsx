import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center py-8 px-2">
      <Head>
        <title>HSK Quizz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl px-4">HSK Quizz Test</h1>

        <p>Choose your level :</p>

        <div className="flex flex-col gap-4">
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
