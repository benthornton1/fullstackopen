import React from 'react'

const Alert = ({ alert }) => {
    if (alert === null) {
        return null
    }

    const baseStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {...baseStyle, color: 'red'}
    const notificationStyle = {...baseStyle, color: 'green'}

    if (alert.type === 'error'){
        return (
            <div style={errorStyle}>
                {alert.message}
            </div>
        )
    }

    return (
        <div style={notificationStyle}>
            {alert.message}
        </div>
    )
}

export default Alert