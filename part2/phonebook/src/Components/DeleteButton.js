import React from 'react'
import personService from '../Services/Persons'

const DeleteButton = ({ id, name }) => {

    const deletePerson = () => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id).catch(error => {
                window.alert(`${name} was already deleted from server`)
              })
          }
    }

    return (
        <button onClick={ ()=>deletePerson() }>Delete</button>
    )
}

export default DeleteButton