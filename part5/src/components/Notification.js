import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
    
    if (!message) {
        return null
    }

    return (
        <div className={ message[1] }>
            { message[0] }
        </div>
    )
}

export default Notification