import React from 'react'

const Persons = ({ data }) => {
  return (
    <div>
      { data.map(person => <p key={person.id}>{person.name} {person.number}</p>) }
    </div>
  )
}

export default Persons