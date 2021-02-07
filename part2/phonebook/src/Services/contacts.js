import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

async function getAll () {
    try {
      const request = await axios.get(baseUrl);
      return request.data;
    } catch (error) {
      console.log(`Failed to get all contacts. Error: ${error}`)
    }
  }
  
  async function create (newContact)  {
    try {
        const request =  await axios.post(baseUrl, newContact);
        return request.data;
    } catch (error) {
        console.log(`Failed to create contact. Error: ${error}`)
    }
  }
  
  async function update (id, newContact) {
    try {
        const request = await axios.put(`${baseUrl}/${id}`, newContact);
        return request.data;
    } catch (error) {
        console.log(`Failed to update contact. Error: ${error}`)
    }
  }

  async function deleteContact (id) {
      try {
          const request = await axios.delete(`${baseUrl}/${id}`);
          return request.data
      } catch (error) {
         console.log(`Failed to delete contact. Error: ${error}`)
      }
  }
  
  export default { getAll, create, update, deleteContact }