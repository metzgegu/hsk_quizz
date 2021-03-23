import { useRouter } from 'next/router';
import { useEffect, useState} from 'react';
import { getHskData } from '../../utils/actions.async';
import { shuffleArray } from "../../utils/helper";
import Question from "../../components/Question";
import styles from '../../styles/Home.module.css'

export default function Hsk() {
    const router = useRouter()
    const { level } = router.query
    const [hskData, setHskData] = useState(undefined);
    const [currentQuestion, setCurrentQuestion] = useState(undefined)

    const getRandomInt = (max, forbiddenInt) => {
        const randomId = Math.floor(Math.random() * Math.floor(max))
        if (forbiddenInt === randomId) {
            return getRandomInt(max, forbiddenInt)
        } else {
            return randomId
        }
    }

    const handleSubmitResponse = (proposal) => {
        if (currentQuestion.expected.id === proposal.id) {
            if (currentQuestion.index < hskData.length) setCurrentQuestion({ index: currentQuestion.index + 1, expected: hskData[currentQuestion.index + 1], proposals: getRandomProposal(currentQuestion.index + 1, hskData.length).map(key => hskData[key]) })
        } else {
            setCurrentQuestion({...currentQuestion, proposals: currentQuestion.proposals.map(p => p.id === proposal.id ? { ...p, incorrect: true } : p) })
        }
    }

    function getRandomProposal(currentQuestion, size) {
        const proposals = [currentQuestion , ...new Array(3).fill(undefined).map(_ => getRandomInt(size - 1, currentQuestion))];
        console.log('proposal', proposals)
        return shuffleArray(proposals);
    }

    useEffect(async () => {
        if (hskData && currentQuestion) {
            console.log(currentQuestion.expected, currentQuestion.proposals)
        }

        if (!hskData && level) {
            const hsk = await getHskData(level)
            console.log('ehllo')
            setHskData(shuffleArray(hsk));
            console.log('ehllo')
            setCurrentQuestion({ index: 0, expected: hsk[0], proposals: getRandomProposal(0, hsk.length).map(key => hsk[key]) })
        }
    })

    return (
        <div className={styles.container}>
            {level && <h2>Hsk {level}</h2>}
            {currentQuestion && hskData && (
                <Question question={currentQuestion} onSubmitResponse={handleSubmitResponse}></Question>
            )}
        </div>
    )
}