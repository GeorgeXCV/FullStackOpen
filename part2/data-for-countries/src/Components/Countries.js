import React from 'react';
import Button from "./Button";
import Country from "./Country";

const Countries = ({filteredCountries, showCountry}) => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return filteredCountries.map(country => 
        (
        <p key={country.name}>
           {country.name} <Button text="Show" handleClick={() => showCountry(country)}/>
        </p>
        ))
    } else if (filteredCountries.length === 1) {
        return (
          <Country country={filteredCountries[0]}/>   
        )
    } else {
      return null;
    }
  }

  export default Countries;

 