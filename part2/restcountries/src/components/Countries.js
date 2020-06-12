import React from 'react'

import CountryDetail from './CountryDetail'
import CountryBasic from './CountryBasic'

const Countries = ({ countries }) => {

    if(countries.length > 10){
        return <div>Too many matches, specify another filter.</div>
    } else if (countries.length === 1){
        return <CountryDetail key={countries[0].numericCode} country={countries[0]} />
    } else {
        return (
            <div>
                {countries.map(country => (
                    <CountryBasic key={country.numericCode} country={country} />
                ))}
            </div>
        )
    }
}

export default Countries