import React from 'react'
import personService from '../Services/Persons'

const DeleteButton = ({ id, name, onDelete }) => {

    const deletePerson = () => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id).catch(error => {
                window.alert(`${name} was already deleted from server`)
            onDelete(personService.getAll().then(response => response.data))
              })
          }
    }

    return (
        <button onClick={ ()=>deletePerson() }>Delete</button>
    )
}

export default DeleteButton