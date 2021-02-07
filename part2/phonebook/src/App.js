import React, { useState, useEffect  } from 'react'
import ContactForm from "./Components/ContactForm";
import Contacts from "./Components/Contacts";
import Filter from "./Components/Filter";
import contactsService from './Services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ contactFilter, setNewContactFilter ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
  
    async function getContacts() {
      try {
        const contacts = await contactsService.getAll();
        setPersons(contacts);
        setNewContactFilter(contacts);
      } catch (error) {
        console.log(`Failed to fetch contacts. Error: ${error}`)
      }
    }

    getContacts();
  },[persons.length])

  async function addPerson (event) {
    event.preventDefault();
    const newPerson = {
      name : newName,
      number: newNumber
    }
    const person = searchPeople(newName);
    if (person !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        setPersons(persons.concat(await contactsService.update(persons[person].id, newPerson)));
      }
    } else {
      setPersons(persons.concat(await contactsService.create(newPerson)));
    }
    setNewName('')
    setNewNumber('')
  }

  async function deletePerson (name, id) {
    if (window.confirm(`Delete ${name}?`)) {
        setPersons(persons.concat(await contactsService.deleteContact(id)))
    }
  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleSearchChange=(event)=>{
       const keyword = event.target.value
       setNewSearch(keyword)
       const filter = !keyword.length ? persons: persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()));
       setNewContactFilter(filter);
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
      <Contacts filteredContacts={contactFilter} deleteContact={deletePerson}/>
    </div>
  )
}

export default App