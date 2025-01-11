import { useState } from "react"

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Bella Andrews', number: '123-4567890', id: 1 },
    { name: 'Becky Sparks', number: '39-4447290', id: 2 },
    { name: 'Cherry Chester', number: '803-5567392', id: 3 },
    { name: 'Peter Dallas', number: '97-7248910', id: 4 },
    { name: 'Chloe Martins', number: '39-4457220', id: 5 },
  ])

  const [newName, setNewName] = useState('')

  const [phoneNumber, setPhoneNumber] = useState('')

  const [filterPerson, setFilterPerson] = useState('')

  const addName = (event) => {
    event.preventDefault() // This prevents the default action
    
    if (persons.some(person => person.name === newName)) {
      // Checks for already existing names using the some method
      alert(`${newName} is already added to phonebook, try again!`);
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
      <div>
        filter shown with <input value={filterPerson} 
        onChange={handleFilterPerson}/>
      </div>

      <h1>add a new</h1>
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

      <h1>Numbers</h1>
      <ul style={{
        listStyle:'none',
        padding: 0
        }}>
        {personsToShow.map(person => 
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>

    </div>
  )
}

export default App