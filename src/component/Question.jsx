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
                    {props.question.questionName}
                    <br/>
                    <b className={props.question.expectedItem.expectedName.match(/[\u3400-\u9FBF]/) ? "chinese" : ""}>
                        {props.question.expectedItem.expectedName}
                    </b>
                </div>
                <div className='question__proposals'>
                    <ul>
                    {props.question.randomProposal && shuffleArray(props.question.randomProposal).map((proposal, index) => (
                        <li key={index}>
                            <Button
                                onClick={() => props.onSubmitResponse(proposal)}
                            >
                                {props.question.proposalKey.reduce((previousValue, key) => `${previousValue} ${proposal[key]}`, '')}
                            </Button>
                        </li>
                    ))}
                    </ul>
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