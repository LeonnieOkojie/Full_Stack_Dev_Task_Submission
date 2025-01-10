import { useState } from "react"

const App = () => {

  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Bella Leonnie'
    }
  ])

  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault() // This prevents the default action
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = { 
      name: newName, 
      id: persons.length + 1 // This sets the id of the person
    }
    
    console.log('New person', personObject)

    setPersons(persons.concat(personObject)) // Adds the person to a new array

    setNewName('') // Resets the input field
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // Sets the value of the input field
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
          <button type="submit">Add</button>
        </div>

      </form>

      <h2>Numbers</h2>
      <ul style={{
        listStyle:'none',
        padding: 0
        }}>
        {persons.map(person => 
          <li key={person.id}>{person.name}</li>
        )}
      </ul>

    </div>
  )
}

export default App