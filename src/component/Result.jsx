import React from 'react'
import PropTypes from "prop-types";
require('../style/Result.css')

class Result extends React.Component {
    render() {
        const { responses } = this.props

        const mistakeList = this.getMistakeList(responses)

        return (
            <div className='result__container'>
                <div className='result_title'>Resultat : <b>{responses.length - mistakeList.length}/{responses.length}</b></div>
                {mistakeList.map((mistake, index) => (
                    <div className='result_response' key={index}>La traduction de <b>{mistake.expected.expectedName}</b> était <b>{mistake.expected.expectedValue}</b></div>
                ))}
            </div>
        )
    }

    getMistakeList(responses) {
        return responses.filter((e) => e.expected.id !== e.response.id)
    }
}

export default Result

Result.propTypes = {
    responses: PropTypes.array
}

Result.defaultProps = {
    responses: []
}
