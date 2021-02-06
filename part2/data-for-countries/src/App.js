import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import Countries from "./Components/Countries";
import Search from "./Components/Search";

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState('')

  useEffect(() => {
  
    async function getCountries() {
      try {
        const countries = await axios.get('https://restcountries.eu/rest/v2/all')
        setCountries(countries.data)
      } catch (error) {
        console.log(`Failed to fetch countries. Error: ${error}`)
      }
    }

    getCountries();
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    const filter = countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredCountries(filter);
  }

  const showCountry = (country) => {
    setFilteredCountries([country])
  }

  return (
    <div>
        <Search query={searchQuery} handleSearchChange={handleSearchChange} />
        <Countries filteredCountries={filteredCountries} showCountry={showCountry}/>
     </div>       
  )
}

export default App