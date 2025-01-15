import { useState, useEffect } from "react";
import axios from 'axios';
import Weather from "./components/Weather";

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  //useEffect for fetching the data from the API
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all') //Making a GET request to fetch all countries from the API
      .then(response => {
        setCountries(response.data) //updates the countries state with the API response
      })
  }, []) //[] makes the effect run only once

  const handleChange = (event) => {
    setFilterCountries(event.target.value) // updates the filterCountries state with the text typed in
    setSelectedCountry(null)
    console.log('Searched for', event.target.value)
  }

  // Displays the information of searched or selected country
  const handleShowDetails = (country) => {
    setSelectedCountry(country)
    console.log(country)
  }

  //filtering the countries list based on the user's input
  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(filterCountries.toLowerCase()) // converts both the country name and users input to lowercase making it case sensitive
  )

  return (
    <div>
      <form>
        find countries <input value={filterCountries} onChange={handleChange}/>
      </form>
      
      {/* Displays a message if the search result outputs are more than 10 */}
      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* Displays a list of country names if there are only 2 to 10 matching countries   */}
      {countriesToShow.length <= 10 && countriesToShow.length > 1 && (
        <ul>
          {countriesToShow.map(country => 
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowDetails(country)}>show</button>
            </li>
          )} 
        </ul>
      )}

      {/* Displays the country and its information if there is exactly 1 matching country */}
      {countriesToShow.length === 1 && (
        <div>
          <h1>{countriesToShow[0].name.common}</h1> 
          <p>capital {countriesToShow[0].capital}</p>
          <p>area {countriesToShow[0].area}</p>

          <h2>languages:</h2>
          <ul>
            {Object.values(countriesToShow[0].languages).map(language =>
              <li key={language}>{language}</li>
            )}
          </ul>

          <img 
            src={countriesToShow[0].flags.png}
            alt={`The image of the flag of ${countriesToShow[0].name.common}`}
            width="100"
          />

          <Weather capital={countriesToShow[0].capital}/> {/* Displays the weather of the capital a searched country */}
        </div>
      )}

      {/* Displays the information of a country after the show button is clicked */}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>capital {selectedCountry.capital}</p>
          <p>area {selectedCountry.area}</p>

          <h2>languages</h2>
          <ul>
            {Object.values(selectedCountry.languages).map(language => 
              <li key={language}>{language}</li>
            )}
          </ul>

          <img 
          src={selectedCountry.flags.png}
          alt={`The image of the flag of ${selectedCountry.name.common}`}
          width="100"
          />

          <Weather capital={selectedCountry.capital}/> {/* Displays the weather information of a selected country */}
        </div>
      )}
    </div>
  )
}

export default App;