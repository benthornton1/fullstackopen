import React, { useState } from 'react'
import CountryDetail from './CountryDetail'
import CountryListElement from './CountryListElement'

const CountryBasic = ({country}) => {
    const [detail, toggleDetail] = useState(false)
    const handleToggleDetail = () => {
        toggleDetail(!detail)

    }
    if (!detail ){
        return (
            <div>
                <CountryListElement name={country.name} handleClick={handleToggleDetail} text="show" />   
            </div>
        )
    }
    return (
        <div>
            <CountryListElement name={country.name} handleClick={handleToggleDetail} text="hide" />   
            <CountryDetail country={country} />
        </div>
    )
}

export default CountryBasic