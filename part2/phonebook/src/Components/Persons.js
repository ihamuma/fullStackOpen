import React from 'react'
import Person from './Person'

const Persons = ({ data, filter, handleDelete }) => {

  const toShow = data.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      { toShow.map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete} />) }
    </div>
  )
}

export default Persons