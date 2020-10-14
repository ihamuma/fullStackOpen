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

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const searchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <SearchBox value={search} onChange={searchChange} />
    </div>
  )

}

export default App;
