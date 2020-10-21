import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({ data, filter, onDelete }) => {

  const toShow = data.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      { toShow.map(person => <div key={person.id}>{person.name} {person.number}<DeleteButton id={person.id} name={person.name} onDelete={onDelete} /></div>) }
    </div>
  )
}

export default Persons