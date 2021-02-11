require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const Phonebook = require('./models/phonebook')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
morgan.token('body', (req, res) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
}); 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Phonebook.findById(id).then(contact => {
      if (contact) {        
          response.json(contact)      
        } else {        
          response.status(404).end()      
        }   
      })
      .catch(error => next(error))
  })

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    
    Phonebook.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
 
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ 
          error: 'Name is required in request body.' 
        })
      }

      if (!body.number) {
        return response.status(400).json({ 
          error: 'Number is required in request body.' 
        })
      }
    
    const duplicate = persons.find(person => person.name == body.name)
    if (duplicate) {
        request.method = 'PUT'
        request.url = `/api/persons/${person.id}`
        next();
      } else {
        const person = new Phonebook({
          name: body.name,
          number: body.number,
          id: generateId(),
        })
      
      person.save().then(savedContact => {
        response.json(savedContact)
      })
      .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (request, response, next) => {
  
    const body = request.body

    const person = {
      name: body.name,
      number: body.number,
    }

    Phonebook.findByIdAndUpdate(request.params.id, person, {new: true})
    .then (result => {
      response.json(result)
    })
    .catch(error => next(error))
 })

app.get('/info', async (request, response) => {
    const phonebookLength = await Phonebook.count({});
    response.send(`<p>Phonebook has info for ${phonebookLength} people</p> <br>${ new Date()}<p>`)
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
  }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)