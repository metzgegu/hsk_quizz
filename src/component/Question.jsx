import React from 'react'
import PropTypes from "prop-types";
import Button from "./Button";
import { shuffleArray } from "../helper.js";
require('../style/Question.css')

class Question extends React.Component {
    render() {
        const { props } = this
        return (
            <div className='question__container'>
                <div className='question__name'>
                    {props.question.questionName} <br/><b>{props.question.expectedItem.expectedName}</b>
                </div>
                <div className='question__proposals'>
                    {props.question.randomProposal && shuffleArray(props.question.randomProposal).map((proposal, index) => (
                        <Button
                            key={index}
                            onClick={() => props.onSubmitResponse(proposal)}
                        >
                            {proposal.car}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }
}

export default Question

Question.propTypes = {
    question: PropTypes.object,
    onSubmitResponse: PropTypes.func
}

Question.defaultProps = {
    question: {},
    onSubmitResponse: () => {}
}