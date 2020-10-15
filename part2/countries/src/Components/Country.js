import React, { useState } from 'react'
import Button from './Components/Button'

const Country = ({ info, details }) => {
    const [showDetails, setShowDetails] = useState(details)
  
    if (showDetails) {
      return (
        <div>
          <h2>{info.name} <Button text="Hide" onClick={()=>setShowDetails(false)}/></h2>
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
    } else {
      return (
        <div>
          {info.name} <Button text="Show" onClick={()=>setShowDetails(true)}/>
        </div>
      )
    }
  }

  export default Country