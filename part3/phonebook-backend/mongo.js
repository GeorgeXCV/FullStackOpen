const mongoose = require('mongoose')

const password = process.argv[2]
const newName = process.argv[3];
const newNumber = process.argv[4];

if (!password) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const url = `mongodb+srv://FullStackOpen:${password}@fullstackopen.iixz8.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
    Contact.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(contact => {
          console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
      })
} else if (newName && newNumber) {
    const contact = new Contact({
        name: newName,
        number: newNumber,
      })
      
      contact.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to the phonebook!`)
        mongoose.connection.close()
      })
}
