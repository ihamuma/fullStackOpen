import React from 'react'
import DeleteButton from './DeleteButton'


const Persons = ({ data, onDelete }) => {
  return (
    <div>
{ data.map(person => <div key={person.id}>{person.name} {person.number}<DeleteButton id={person.id} name={person.name} /></div>) }
    </div>
  )
}

export default Persons