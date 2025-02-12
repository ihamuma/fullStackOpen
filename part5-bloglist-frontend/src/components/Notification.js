import { useState, useEffect } from 'react'
import '../index.css'

const Notification = ({ message }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (message) {
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            }, 5000)
        }
    }, [message])

    if (!visible || !message) {
        return null
    }

    return (
        <div className={ message.class }>
            { message.text }
        </div>
    )
}

export default Notification