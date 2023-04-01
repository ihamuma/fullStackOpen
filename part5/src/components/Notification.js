import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
    
    if (!message) {
        return null
    }

    return (
        <div className={ message.class }>
            { message.text }
        </div>
    )
}

export default Notification