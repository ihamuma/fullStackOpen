import React from 'react'
import Country from './Country'

const DisplayBox = ({ data, criteria }) => {

  console.log("data: " + data);

    let filtered = data.filter(country => country.name.toLowerCase().includes(criteria.toLowerCase()))
  
    if (criteria === '') {
      return (
        <div>Please specify a filter</div>
      )
    }
    if ( filtered.length > 10 ) {
      return (
        <div>Too many matches, please specify another filter</div>
      )
    } if ( filtered.length === 1 ) {
      return (
        <Country info={filtered[0]} details={true} />
      )
    } if (filtered.length === 0) {
      return (
        <div>No matches, please specify another filter</div>
      )
    } else {
      return (
        <div>
          {filtered.map(country => <Country key={country.name} info={country} details={false} />)}
        </div>
      )
    }
  }

  export default DisplayBox