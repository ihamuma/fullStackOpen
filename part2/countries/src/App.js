import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBox = ({ onChange, value }) => {
  return (
    <div>
      Find countries: <input
                        value={value}
                        onChange={onChange}
                      />
    </div>
  )
}

const DisplayBox = ({ data, criteria }) => {

  let filtered = data.filter(country => country.name.toLowerCase().includes(criteria.toLowerCase()))

  if ( filtered.length > 10 || criteria === '' ) {
    return (
      <div>Too many matches, please specify another filter</div>
    )
  } if ( filtered.length === 1 ) {
    return (
      <div>
        <h2>{filtered[0].name}</h2>
        <p>
          Capital: {filtered[0].capital} <br/>
          Population: {filtered[0].population}
        </p>
        <h3>Languages</h3>
        <div>
          {filtered[0].languages.map(language => <p key={language.iso639_1} >• {language.name}</p>)}
        </div>
        <img width="300" src={filtered[0].flag} alt="" />
      </div>
    )
  } if (filtered.length === 0) {
    return (
      <div>No matches, please specify another filter</div>
    )
  } else {
    return (
      <div>
        {filtered.map(country => <p key={country.name}>{country.name}</p>)}
      </div>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const searchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <SearchBox value={search} onChange={searchChange} />
      <DisplayBox data={countries} criteria={search} />
    </div>
  )

}

export default App;
