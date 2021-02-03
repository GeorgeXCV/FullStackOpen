import React, { useState } from 'react'
import ContactForm from "./Components/ContactForm";
import Contacts from "./Components/Contacts";
import Filter from "./Components/Filter";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (searchPeople(newName) !== -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name : newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson));
    }
    event.target.value = ''
  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleSearchChange=(event)=>{
    setNewSearch(event.target.value)
    const filter = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()));
    setNewFilter(filter);
  }

  const searchPeople = (name) => {
      return persons.map(person => person.name).indexOf(name);
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter query={newSearch} handleSearchChange={handleSearchChange} />
        <div>
          <h3>Add New Contact</h3>
          <ContactForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
        </div>
      <h3>Numbers</h3>
      <Contacts names={persons} filter={newFilter}/>
    </div>
  )
}

export default App