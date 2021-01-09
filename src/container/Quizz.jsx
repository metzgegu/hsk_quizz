import React from 'react'
import PropTypes from 'prop-types'
import Button from "../component/Button";
import { quizzData } from "../QuizzData";
import Questions from "./Questions";
require('../style/Quizz.css')

class Quizz extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            quizzStarted: false
        }
    }

    render() {
        const { state, props } = this

        return (
            <div className='quizz__container'>
                {state.quizzStarted && (
                    <Questions quizzData={quizzData} />
                )}

                <Button
                    onClick={() => this.setState(prevState => ({ quizzStarted: !prevState.quizzStarted }))}
                    className={state.quizzStarted ? 'quizz__back' : ''}
                >
                    {state.quizzStarted ? 'Retour' : `Start the ${props.quizzName} quizz`}
                </Button>
            </div>
        )
    }
}

export default Quizz

Quizz.propTypes = {
    quizzName: PropTypes.string
}

Quizz.defaultProps = {
    quizzName: 'HSK'
}
