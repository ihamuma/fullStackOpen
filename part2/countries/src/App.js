import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBox from './Components/SearchBox'
import DisplayBox from './Components/DisplayBox'

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
