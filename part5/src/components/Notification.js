import React from 'react'
//import '../index.css'

const Notification = ({ message }) => {
    
    if (!message) {
        return null
    }

    return (
        <div>
            {message}
        </div>
    )
}

export default Notification