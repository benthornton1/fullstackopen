require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has ${persons.length} people</p><p>${date}</p>`)
    })
    .catch(error => {
        console.log(error)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
    .catch(error => {
        console.log(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end()
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name ) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
                    name: body.name,
                    number: body.number
                })
    
    return person
        .save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => {
            res.status(400).json(error.message)
        })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})