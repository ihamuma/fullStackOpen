import React, {useEffect, useState} from 'react'
import axios from 'axios'

/* REACT_APP_API_KEY='767daf940b2468d69ef95639f5ef25f5' */

const Weather = ({ location }) => {
    const [ weatherData, setWeatherData ] = useState({ location:{}, current: {}, request:{} })
    
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${location}`)
          .then(response => {
            setWeatherData(response.data)
          })
      }, [location])

    return (
        <div>
            <h3>Weather in {location}</h3>
            <img src={weatherData.current.weather_icons} alt="" />
            <div>Temperature: {weatherData.current.temperature} Celcius</div>
            <div>Wind: {weatherData.current.wind_speed} kph, direction {weatherData.current.wind_dir}</div>
        </div>

    )
}

export default Weather