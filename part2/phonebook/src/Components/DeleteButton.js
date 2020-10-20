import React from 'react'
import personService from '../Services/Persons'

const deletePerson = ({ id, name }) => {
    console.log('delete', id, name)
    if (window.confirm(`Delete ${name}?`))
    personService.remove(id)
}

const DeleteButton = ({ id, name }) => {
    console.log('button', id, name)
    return (
        <button onClick={ ()=>deletePerson( id={id}, name={name} ) }>Delete</button>
    )
}

export default DeleteButton