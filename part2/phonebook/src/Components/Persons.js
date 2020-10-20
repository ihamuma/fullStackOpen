import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({ data }) => {
  return (
    <div>
{ data.map(person => { console.log('person', person.id, person.name); return <div key={person.id}>{person.name} {person.number}<DeleteButton id={person.id} name={person.name} /></div>}) }
    </div>
  )
}

export default Persons