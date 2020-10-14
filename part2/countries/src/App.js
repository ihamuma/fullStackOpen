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

const DisplayBox = ({ data, criteria, click }) => {

  let filtered = data.filter(country => country.name.toLowerCase().includes(criteria.toLowerCase()))

  if ( filtered.length > 10 || criteria === '' ) {
    return (
      <div>Too many matches, please specify another filter</div>
    )
  } if ( filtered.length === 1 ) {
    return <Country info={filtered[0]} />
  } if (filtered.length === 0) {
    return (
      <div>No matches, please specify another filter</div>
    )
  } else {
    return (
      <div>
        {filtered.map(country => <div key={country.name}>{country.name}<Button info={country.name} /></div>)}
      </div>
    )
  }
}

const Button = ({ info }) => {
  return (
    <button>Show</button>
  )
}

const Country = ({ info }) => {
  return (
    <div>
      <h2>{info.name}</h2>
      <p>
        Capital: {info.capital} <br/>
        Population: {info.population}
      </p>
      <h3>Languages</h3>
      <div>
        {info.languages.map(language => <p key={language.iso639_1}>• {language.name}</p>)}
      </div>
      <img width="300" src={info.flag} alt="" />
    </div>
  )
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
      <DisplayBox data={countries} criteria={search} click={setSearch} />
    </div>
  )

}

export default App;
