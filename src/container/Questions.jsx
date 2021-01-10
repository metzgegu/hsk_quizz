import React from 'react'
import PropTypes from "prop-types";
import { quizzData } from "../QuizzData";
import Question from "../component/Question";
import Result from "../component/Result";
require('../style/Questions.css')

class Questions extends React.Component {
    PROPOSAL_NUMBER = 4

    constructor (props) {
        super(props)

        this.state = {
            currentQuestion: this.getNextQuestion(),
            responses: []
        }
    }

    getRandomInt(max, forbiddenIntList) {
        const randomId = Math.floor(Math.random() * Math.floor(max))
        if (forbiddenIntList.find(e => e.id === randomId)) {
            return this.getRandomInt(max, forbiddenIntList)
        } else {
            return randomId
        }
    }

    //TODO Improve this
    getRandomProposal(proposalNumber, items, currentItemId) {
        const randomProposal = []
        for (let i = 0; i < proposalNumber; i++) {
            const randomId = this.getRandomInt(items.length - 1, [currentItemId, randomProposal.map(e => e.id)])

            randomProposal.push(items[randomId])
        }
        return randomProposal;
    }

    handleSubmitResponse = (proposal) => {
        const responses = [
            ...this.state.responses,
            {
                response: proposal,
                expected : {
                    ...this.state.currentQuestion.expectedItem,
                    expectedValue: this.props.quizzData.received.reduce((p,e) => p + this.state.currentQuestion.expectedItem[e], '')
                }
            }
        ]
        this.setState({
            responses,
            currentQuestion: this.getNextQuestion()
        })
    }

    getNextQuestion() {
        const currentIndex = this.getRandomInt(quizzData.items.length, []) - 1
        const currentItem = this.props.quizzData.items[currentIndex]
        const nextQuestion = {
            proposalKey: this.props.quizzData.received,
            expectedItem: {
                ...currentItem,
                expectedName: this.props.quizzData.expected.reduce((p,e) => p + currentItem[e], '')
            },
            questionName: this.props.quizzData.question,
            randomProposal: [
                currentItem,
                ...this.getRandomProposal(this.PROPOSAL_NUMBER - 1, this.props.quizzData.items, currentItem.id)
            ]
        }

        return nextQuestion
    }

    render () {
        const { state, props } = this

        return (
            <div className='questions__container'>
                {state.responses.length === props.questionCount ? (
                    <Result responses={state.responses} />
                ) : (
                    <>
                        <div className='questions__count'>{state.responses.length + 1}/{props.questionCount}</div>
                        <Question
                            question={state.currentQuestion}
                            onSubmitResponse={this.handleSubmitResponse}
                        />
                    </>
                )}
            </div>
        )
    }
}

export default Questions

Questions.propTypes = {
    quizzData: PropTypes.object,
    questionCount: PropTypes.number,
}

Questions.defaultProps = {
    quizzData: {},
    questionCount: 10,
}
