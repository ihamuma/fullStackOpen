import React, { useState } from 'react'

const Names = ({ persons }) => {
  return (
    <div>
      { persons.map(person => <p key={person.id}>{person.name} {person.number}</p>) }
    </div>
  )
}

const App = () => {
  const [persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const checkDuplicate = () => {
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      return false
    } else {
      return true
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (!checkDuplicate()) {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          Number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />
    </div>
  )
}

export default App