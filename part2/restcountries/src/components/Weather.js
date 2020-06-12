import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState()

    const hook = () => {        
        const params = {
                access_key: process.env.REACT_APP_API_KEY,
                query: city
            } 
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                setWeather(response.data)
            })
    }
    useEffect(hook, [])

    if(weather) {
        console.log(weather)
        return (
            <div>
                <h4>Weather in {city}</h4>
                <p><b>Temperature: </b>{weather.current.temperature} Celsius</p>
                <div>
                    {weather.current.weather_icons.map((icon, idx) =>
                        <img key={idx} src={icon} alt="weather icon"></img>
                    )}
                </div>
                <p><b>Wind: </b>{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
            </div>
        )
    }

    return (
        <div>Loading... please wait!</div>
    )
}

export default Weather