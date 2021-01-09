import React from 'react'
import PropTypes from "prop-types";
// require('../style/Result.css')

class Result extends React.Component {
    render() {
        const { responses } = this.props

        const mistakeList = this.getMistakeList(responses)

        console.log(mistakeList)

        return (
            <div className='result__container'>
                <div className='result_title'>Resultat : {responses.length - mistakeList.length}/{responses.length}</div>
                {}
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
