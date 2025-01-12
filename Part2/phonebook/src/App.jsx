import { useState, useEffect } from "react"
import personService from "./services/persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import PersonsList from "./components/PersonsList"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(InitialPerson => {
        console.log('promise fulfilled')
        setPersons(InitialPerson)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault() // This prevents the default action
    
    const existingUser = persons.find(person => person.name === newName) // Checks if the name already exists

    if (existingUser) { 
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      
      if (confirmUpdate) { // If the user confirms the update
        const updatedPerson = { ...existingUser, number: phoneNumber } // Updates the number
        personService
        .update(existingUser.id, updatedPerson) 
        .then(returnedPerson => { 
          setPersons(persons.map(person => person.id !== existingUser.id ? person : returnedPerson)) 
          setNewName('') 
          setPhoneNumber('')
        })
        return
      }
    }
    const personObject = { 
      name: newName, 
      number: phoneNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)) // Adds the new person to the array
        setNewName('') // Resets the input field
        setPhoneNumber('') // Resets the input field 
      })
    console.log('New person', personObject)
  }

  const deletePerson = (id) => { 
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name} ?`)
    if (result) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // Sets the value of the input field
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setPhoneNumber(event.target.value)
  }

  const handleFilterPerson = (event) => {
    console.log(event.target.value) 
    setFilterPerson(event.target.value)
  }

  const personsToShow = persons.filter(person => 
      person.name.toLowerCase().includes
      (filterPerson.toLowerCase()) // filters name based on the input
    )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterPerson={filterPerson} handleFilterPerson={handleFilterPerson}/>

      <h1>Add a new</h1>
      <PersonForm 
      newName={newName}
      phoneNumber={phoneNumber}
      handleNewName={handleNewName}
      handleNumber={handleNumber}
      addName={addName}
      />

      <h1>Numbers</h1>
      <PersonsList persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App