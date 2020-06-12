import React from 'react'
import Button from './Button'

const CountryListElement = ({name, handleClick, text}) => (
    <div>
        {name}
        <Button handleClick={handleClick} text={text} />
    </div>
)

export default CountryListElement