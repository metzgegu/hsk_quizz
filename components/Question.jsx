import React from 'react'
import PropTypes from "prop-types";
import styles from './Question.module.css'

class Question extends React.Component {
    render() {
        const { props } = this
        return (
            <div className={styles.container}>
                <div className={styles.name}>
                    What does mean :
                    <br/>
                    <b className={props.question.expected.hanzi.match(/[\u3400-\u9FBF]/) ? "chinese" : ""}>
                        {props.question.expected.hanzi}
                    </b>
                </div>
                <div className={styles.proposals}>
                    <ul>
                    {props.question.proposals && props.question.proposals.map((proposal, index) => (
                        <li key={index}>
                            <button
                                onClick={() => props.onSubmitResponse(proposal)}
                                className={proposal.incorrect ? styles.incorrect : ''}
                            >
                                {proposal.translations[0]}
                            </button>
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