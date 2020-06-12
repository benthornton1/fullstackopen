import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }
    useEffect(hook, [])

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const countriesToShow = newFilter
        ? countries.filter(country => {
            const lower = country.name.toLowerCase()
            return lower.includes(newFilter.toLowerCase())
        })
        : countries

    return(
        <div>
            <p>Find Countries: </p>
            <Filter value={newFilter} onChange={handleFilterChange} />
            <Countries countries={countriesToShow} />
        </div>
    )
}


export default App