import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Alert from './components/Alert'
import personService from './services/person'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [newAlert, setNewAlert] = useState(null)
    useEffect(() => {
        personService
            .getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, [])
    
    const addPerson = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newNumber,
            id: persons.length+1
        }
        const existingPerson = persons.find(eP => eP.name === person.name)
        if (existingPerson) {
            if (window.confirm(
                    `${existingPerson.name} is already added to the phonebook, replace their old number with the new one?`
                )
            ){
                personService
                    .update(existingPerson.id, { ...existingPerson, number: person.number})
                    .then(uP => {
                        setPersons(persons.map(p => p.id !== uP.id ? p : uP))
                    }).catch(error => {
                        setNewAlert({
                            message: `Information of ${existingPerson.name} was already removed from the server`,
                            type: 'error'
                        })
                        setPersons(persons.filter(p => p.id !== existingPerson.id ))
                        setTimeout(() => {
                            setNewAlert(null)
                        }, 5000)
                    })
            }
        } else {
            personService
                .create(person)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNewAlert({
                        message: `Added ${person.name}`,
                        type: 'notification'
                    })
                    setTimeout(() => {
                        setNewAlert(null)
                    }, 5000)
                })
        }
    }
    const handleRemove = (person) => {
        if (window.confirm(`Delete ${person.name}?`)){
            personService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = newFilter
        ? persons.filter(person => {
            const lower = person.name.toLowerCase()
            return lower.includes(newFilter.toLowerCase())
        })
        : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Alert alert={newAlert} />
            <Filter value={newFilter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person =>
                    <Person key={person.name} person={person} handleRemove={() => handleRemove(person)}/>
                )}
            </ul>
        </div>
    )
}

export default App