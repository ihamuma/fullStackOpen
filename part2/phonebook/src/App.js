import React, { useState } from 'react'

const Names = ({ persons }) => {
  return (
    <div>
      { persons.map(person => <p key={person.id}>{person.name}</p>) }
    </div>
  )
}

const App = () => {
  const [persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')

  const checkDuplicate = () => {
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      return false
    } else {
      return true
    }
  }

  const addName = (event) => {
    event.preventDefault()
    if (!checkDuplicate()) {
      const nameObject = {
        name: newName,
        id: persons.length,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input 
                  value={newName}
                  onChange={handleNameChange}
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