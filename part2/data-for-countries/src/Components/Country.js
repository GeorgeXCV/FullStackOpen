import React, { useEffect, useState } from 'react';
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const Country = ({country}) => {
    const [ weather, setWeather ] = useState(null);
    
    useEffect(() => {
      async function getWeather() {
        try {
          const weather = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
          setWeather(weather.data.current)
        } catch (error) {
          console.log(`Failed to get weather for country. Error: ${error}`)
        }
      }
    
      getWeather();
    },[country.capital])

    return (
      <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='Flag' width='150'/>
      {weather && (
        <>
        <h2>Weather in {country.capital}</h2>
        <p><b>Temperature:</b> {weather.temperature} Celcius</p>
        <img src={weather.weather_icons[0]} alt='Weather Icon' width='150'/>
        <p><b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </>
       )
      }
      
      </div>
    )
}

export default Country;