import { useState, useEffect} from "react";
import axios from "axios";

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY // import API key from environment variable

    useEffect(() => {
        // Fetch data from the openweathermap API
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data) //Updates weather state with the fetched data
            })
    }, [capital, api_key])

    if (!weather) {
        return <div>Loading weather...</div> //Displays while while waiting for data to be fetched
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weather.main.temp} Celcuis</p>
            <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`Weather icon for ${weather.weather[0].description}`}
            />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather;