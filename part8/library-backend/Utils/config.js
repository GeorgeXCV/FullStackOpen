require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  JWT_SECRET,
  PASSWORD,
  PORT,
  MONGODB_URI,
}