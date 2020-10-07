import React, { useState } from 'react'

const Names = ({ data }) => {
  console.log('data', data)
  return (
    <div>
      { data.map(person => <p key={person.id}>{person.name} {person.number}</p>) }
    </div>
  )
}
/*    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 } */

const App = () => {
  const [persons, setPersons] = useState([])
  const [display, setDisplay] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const checkDuplicate = () => {
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      return false
    } else {
      return true
    }
  }

  const filterPersons = () => {
    if (filter !== '') {
      setDisplay(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
      setFilter('')
    } else {
      setDisplay(persons)
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
      setDisplay(persons.concat(nameObject))
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter by name: <input
                        value={filter}
                        onChange={handleFilterChange}
                      />
      <button type="submit" onClick={filterPersons}>Filter</button>
      <h3>Add a new name</h3>
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
      <h3>Numbers</h3>
      <Names data={display} />
    </div>
  )
}

export default App