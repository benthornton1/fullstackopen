import React from 'react'

const Person = ({ person, handleRemove }) => (
        <div>
            <li>
                {person.name} {person.number}
                <button onClick={handleRemove}>Delete</button>
            </li>
        </div>
)

export default Person