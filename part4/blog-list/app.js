const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info(`Connecting to: ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
  })

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use('/api/blogs', blogRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;