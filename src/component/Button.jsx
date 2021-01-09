import React from 'react'
require('../style/Button.css')

class Button extends React.Component {
    render() {
        const { props } = this

        return (
            <button {...props} >
                {props.children}
            </button>
        )
    }
}

export default Button
