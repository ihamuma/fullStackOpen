import React, {useState} from 'react'
import personService from '../Services/Persons'

const Person = ({ name, number, id }) => {
    const [deleted, setDeleted] = useState(false)

    const deletePerson = () => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id).catch(error => {
                window.alert(`${name} was already deleted from server`)
            })
            setDeleted(true)
          }
    }

    if (deleted) {
        return null
    } 
    return (
        <div>
            {name} {number}<button onClick={()=>deletePerson()}>Delete</button>
        </div>
    )
}

export default Person