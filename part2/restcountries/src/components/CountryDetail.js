import React from 'react'
import Weather from './Weather'

const CountryDetail = ({ country }) => (
    <div>
        <h3>{country.name}</h3>
        <p><b>Capital: </b> {country.capital}</p>
        <p><b>Population: </b> {country.population}</p>
        <h4>Languages</h4>
        <ul>
        {country.languages.map(language => 
            <li key={language.iso639_1}>{language.name}</li>
        )}
        </ul>
        <img width="50%" height="50%" src={country.flag} alt="national flag"></img>
        <Weather city={country.capital} />
    </div>

)


export default CountryDetail