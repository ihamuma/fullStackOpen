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
  const [message, setMessage] = useState([null, 'error'])
 
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
          setMessage([`Number for ${response.name} was updated to ${response.number}`, 'message'])
          setTimeout(() => {
            setMessage([null, 'message'])
          }, 3000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage([`${person.name} was already deleted from server`, 'error'])
          setTimeout(() => {
            setMessage([null, 'error'])
          }, 3000)
        })
      }
    } else {
      personService.create(personObject)
      .then( response => {
        setPersons(persons.concat(response))
        setMessage([`${response.name} was added to phonebook`, 'message'])
        setTimeout(() => {
          setMessage([null, 'message'])
        }, 3000)
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
          setMessage([`Deletion succesful`, 'message'])
          setTimeout(() => {
            setMessage([null, 'message'])
          }, 3000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage([`${name} was already deleted from server`, 'error'])
          setTimeout(() => {
            setMessage([null, 'error'])
          }, 3000)
        })
      }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new name</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons data={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App