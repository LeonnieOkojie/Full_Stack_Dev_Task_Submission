import { useState } from "react"

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Bella Andrews',
      number: '123-4567890',
      id: 1
    }
  ])

  const [newName, setNewName] = useState('')

  const [phoneNumber, setPhoneNumber] = useState('')

  const addName = (event) => {
    event.preventDefault() // This prevents the default action
    
    if (persons.some(person => person.name === newName)) {
      // Checks for already existing names using the some method
      alert(`${newName} is already added to phonebook`);
      return; // prevents the name from being added and exits the function
    }

    const personObject = { 
      name: newName, 
      number: phoneNumber,
      id: persons.length + 1, // This sets the id of the person
    }
    
    console.log('New person', personObject)

    setPersons(persons.concat(personObject)) // Adds the person to a new array

    setNewName('') // Resets the input field
    setPhoneNumber('') 
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // Sets the value of the input field
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setPhoneNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>

        <div>
          name: <input value={newName} 
          onChange={handleNewName}/>
        </div>

        <div>
          number: <input value={phoneNumber} 
          onChange={handleNumber}/>
        </div>

        <div>
          <button type="submit">Add</button>
        </div>

      </form>

      <h2>Numbers</h2>
      <ul style={{
        listStyle:'none',
        padding: 0
        }}>
        {persons.map(person => 
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>

    </div>
  )
}

export default App