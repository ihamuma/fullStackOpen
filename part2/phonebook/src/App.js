import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Notification from './Components/Notification'
import personService from './Services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('', 'error')
 
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName)) {
      const person = persons.find(person => person.name === newName)
      const newPerson = { ...person, number: newNumber }
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        personService.update(person.id, newPerson)
        .then( response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
        })
      }
    } else {
      personService.create(personObject)
      .then( response => {
        setPersons(persons.concat(response))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = ( id, name ) => {
    if (window.confirm(`Delete ${name}?`)) {
        personService.remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
            setErrorMessage(`${name} was already deleted from server`)
        })
      }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new name</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons data={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App