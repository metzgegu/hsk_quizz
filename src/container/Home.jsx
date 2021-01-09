import React from 'react'
import Quizz from "./Quizz";
require('../style/Home.css')

class Home extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className='home__container'>
                <h1>Quizz</h1>
                <Quizz></Quizz>
            </div>
        )
    }
}

export default Home
