import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Notification from './Components/Notification'
import personService from './Services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...', 'error')
 
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if ((persons.map(person => person.name).indexOf(newName) === -1)) {
      personService.create(nameObject)
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        personService.update(persons.find(person => person.name === newName).id, nameObject)
      }
    }
    personService.getAll().then(response => setPersons(response))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new name</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons data={persons} filter={filter} />
    </div>
  )
}

export default App