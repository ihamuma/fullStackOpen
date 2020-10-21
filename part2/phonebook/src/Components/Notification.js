import React from 'react'

const Notification = ({  message, className }) => {
    if (message === null) {
        return null
    }

    return (
        <div class={className}>
            {message}
        </div>
    )
}

export default Notification