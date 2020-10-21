import React from 'react'
import Person from './Person'

const Persons = ({ data, filter }) => {

  const toShow = data.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      { toShow.map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} />) }
    </div>
  )
}

export default Persons